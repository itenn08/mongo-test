import {SyntheticEvent, useEffect, useState} from 'react';
import {TextFieldProps} from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import FormInput from '../../FormComponents/FormInput';
import {createEmptyResource} from '../../../utils/paging';
import {useDebounce} from '../../../hooks/useDebounce';
import {Product} from '../../../types/products';
import {
  getProductById,
  useQueryProducts,
} from '../../../hooks/reactQuery/useProducts';

interface Props {
  getProduct?: (val: string | null) => void;
  getQuery?: (val: string) => void;
  initialValue?: string | null;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
  required?: boolean;
  containerStyles?: {[key: string]: any};
}

const ProductAutocomplete = ({
  getProduct,
  getQuery = () => {},
  initialValue = null,
  textFieldProps,
  disabled,
  required = false,
  containerStyles,
}: Props) => {
  const [query, setQuery] = useState<string>('');
  const [queryView, setQueryView] = useState('');
  const [product, setProduct] = useState<Product | null>();

  useEffect(() => {
    const getInitialproduct = async () => {
      if (initialValue) {
        const initialProduct = await getProductById(initialValue);
        setQueryView(initialProduct.name);
        setProduct(initialProduct);
      }
    };
    getInitialproduct();
  }, []);

  const {data: productResource = createEmptyResource(5)} = useQueryProducts(
    {
      pageIndex: 0,
      pageSize: 5,
      query,
    },
    {keepPreviousData: true},
  );

  const debouncedSearchTerm: string = useDebounce<string>(queryView, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setQuery(queryView);
      return;
    }
    setQuery('');
  }, [debouncedSearchTerm]);

  const onInputChange = (
    e: SyntheticEvent,
    newValue: string,
    reason: string,
  ) => {
    setQueryView(newValue);

    if (reason === 'clear') {
      setQueryView('');
      setProduct(null);
    }
  };

  useEffect(() => {
    if (getProduct && (product === null || product)) {
      getProduct(product && product?.id);
    }
  }, [product]);

  useEffect(() => {
    if (getQuery) {
      getQuery(queryView);
    }

    if (!queryView) {
      setProduct(null);
      if (getQuery) getQuery('');
    }
  }, [queryView]);

  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      clearOnBlur={false}
      disablePortal
      id="productAutocomplete"
      sx={{minHeight: 0, ...containerStyles}}
      options={productResource.data}
      onChange={(event: any, newValue: Product | null) => {
        setProduct(newValue || null);
      }}
      getOptionLabel={(option) => option.name}
      onInputChange={onInputChange}
      inputValue={queryView}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <FormInput
          props={{
            name: 'product',
            ...params,
            ...textFieldProps,
            required,
          }}
        />
      )}
    />
  );
};

export default ProductAutocomplete;
