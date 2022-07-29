import {SyntheticEvent, useEffect, useState} from 'react';
import {TextFieldProps} from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {Category} from '../../../types/categories';
import FormInput from '../../FormComponents/FormInput';
import {createEmptyResource} from '../../../utils/paging';
import {useSearchByName} from '../../../hooks/reactQuery/userCategories';
import {useDebounce} from '../../../hooks/useDebounce';

interface Props {
  getCategory?: (val: string | null) => void;
  getQuery?: (val: string) => void;
  initialValue?: string | null;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
}

const CategoryPageAutocomplete = ({
  getCategory,
  getQuery = () => {},
  initialValue = null,
  textFieldProps,
  disabled,
}: Props) => {
  const [query, setQuery] = useState<string>('');
  const [queryView, setQueryView] = useState(initialValue || '');
  const [category, setCategory] = useState<string | null>(initialValue);

  const {data: categoriesResource = createEmptyResource(5)} = useSearchByName(
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
      setCategory(null);
    }
  };

  useEffect(() => {
    if (getCategory) {
      getCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (getQuery) {
      getQuery(queryView);
    }

    if (!queryView) {
      setCategory(null);
      if (getQuery) getQuery('');
    }
  }, [queryView]);
  console.log('categoriesResource.data', categoriesResource.data);
  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      clearOnBlur={false}
      disablePortal
      id="categoryAutocomplete"
      sx={{minHeight: 0}}
      options={categoriesResource.data}
      onChange={(event: any, newValue: Category | null) => {
        setCategory(newValue?.name || '');
      }}
      getOptionLabel={(option) => option.name}
      onInputChange={onInputChange}
      inputValue={queryView}
      renderInput={(params) => (
        <FormInput
          props={{
            name: 'categoryPage',
            ...params,
            ...textFieldProps,
            required: true,
          }}
        />
      )}
    />
  );
};

export default CategoryPageAutocomplete;
