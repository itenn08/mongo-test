import {SyntheticEvent, useEffect, useState} from 'react';
import {TextFieldProps} from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {Category} from '../../../types/categories';
import FormInput from '../../FormComponents/FormInput';
import {createEmptyResource} from '../../../utils/paging';
import {useSearchByName} from '../../../hooks/reactQuery/userCategories';
import {useDebounce} from '../../../hooks/useDebounce';

interface Props {
  getCategory?: (val: Category | null) => void;
  getQuery?: (val: string) => void;
  initialValue?: Category | null;
  textFieldProps?: TextFieldProps;
  disabled?: boolean;
  onlyParent?: boolean;
  required?: boolean;
  containerStyles?: {[key: string]: any};
}

const CategoryPageAutocomplete = ({
  getCategory,
  getQuery = () => {},
  initialValue = null,
  textFieldProps,
  disabled,
  onlyParent = true,
  required = false,
  containerStyles,
}: Props) => {
  const [query, setQuery] = useState<string>('');
  const [queryView, setQueryView] = useState(initialValue?.name || '');
  const [category, setCategory] = useState<Category | null>(initialValue);

  const {data: categoriesResource = createEmptyResource(5)} = useSearchByName(
    {
      pageIndex: 0,
      pageSize: 5,
      query,
      ...(onlyParent && {type: 'parent'}),
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

  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      clearOnBlur={false}
      disablePortal
      id="categoryAutocomplete"
      sx={{minHeight: 0, ...containerStyles}}
      options={categoriesResource.data}
      onChange={(event: any, newValue: Category | null) => {
        setCategory(newValue || null);
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
            required,
          }}
        />
      )}
    />
  );
};

export default CategoryPageAutocomplete;
