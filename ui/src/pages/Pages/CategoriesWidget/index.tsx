import {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
// import {DndProvider} from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';

import {Category} from '../../../types/categories';
import {
  useCategories,
  useQueryCategories,
} from '../../../hooks/reactQuery/userCategories';
import {InfoCard} from '../../../components/InfoCard';
// // import DndCategories from './DndCategories';
// import NewDnd from './NewDnd';
import CategoriesWidgetNew from './Simple';

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   link: Yup.string().required('Link is required'),
// });

export const CategoriesWidget = () => {
  //   const [openDialog, setOpenDialog] = useState(false);
  //   const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  //   const [activeContact, setActiveContact] = useState<ContactsView | undefined>(
  //     undefined,
  //   );

  //   const [typeAction, setTypeAction] = useState<'edit' | 'create' | undefined>(
  //     undefined,
  //   );

  //   const {mutateAsync: updateContact} = useUpdateContact(
  //     'Contact updated successfully',
  //   );

  //   const {mutateAsync: createContact} = useCreateContact(
  //     'Contact added successfully',
  //   );

  //   const {mutateAsync: deleteContact} = useDeleteContact(
  //     'Contact deleted successfully',
  //   );

  //   const formik = useFormik<ContactFormModel>({
  //     initialValues: {
  //       phone: '',
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       roles: '',
  //     },
  //     onSubmit: (values, {resetForm}) => {
  //       resetForm();
  //     },
  //     validationSchema,
  //   });

  const {data: categoriesData, isFetched} = useQueryCategories();

  const sortByPosition = (a: Category, b: Category) => a.order - b.order;

  useEffect(() => {
    if (categoriesData?.data && isFetched) {
      setCategories(categoriesData?.data.sort(sortByPosition));
    }
  }, [categoriesData, isFetched]);

  //   const getEditableContacts = (item: ContactsView) => {
  //     formik.setValues({
  //       phone: item?.userAccount.contact.phone.replace(/[^\d]/g, '') || '',
  //       firstName: item?.userAccount.firstName || '',
  //       lastName: item?.userAccount.lastName || '',
  //       email: item?.userAccount.contact.email || '',
  //       roles: item?.userAccount.roles[0] || '',
  //     });

  //     setActiveContact(item);
  //     setOpenDialog(true);
  //     setTypeAction('edit');
  //   };

  //   const onCreateContact = () => {
  //     formik.setValues({
  //       phone: '',
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       roles: '',
  //     });

  //     setActiveContact(undefined);
  //     setOpenDialog(true);
  //     setTypeAction('create');
  //     formik.resetForm();
  //   };

  //   const getDeletableContacts = (item: ContactsView) => {
  //     setActiveContact(item);
  //     setOpenCancelConfirm(true);
  //   };

  //   const updateCurrentContact = async () => {
  //     await updateContact({
  //       body: {
  //         propertyContactPerson: {
  //           externalId: customerId,
  //           roles: [convertToMacro(formik.values.roles)],
  //         },
  //         userAccount: {
  //           category: activeContact?.userAccount.category || '',
  //           contact: {
  //             email: formik.values.email,
  //             phone: formik.values.phone ? `+${formik.values.phone}` : '',
  //           },
  //           firstName: formik.values.firstName,
  //           lastName: formik.values.lastName,
  //           photoUrl: activeContact?.userAccount.photoUrl || '',
  //           title: activeContact?.userAccount.title || '',
  //           username: activeContact?.userAccount.username || '',
  //         },
  //       },
  //       contactId: activeContact?.id || '',
  //     });

  //     setOpenDialog(false);
  //   };

  //   const saveNewContact = async () => {
  //     await createContact({
  //       body: {
  //         propertyContactPerson: {
  //           externalId: customerId,
  //           roles: [convertToMacro(formik.values.roles)],
  //           propertyOwnerId: customerId,
  //         },
  //         userAccount: {
  //           category: '',
  //           contact: {
  //             email: formik.values.email,
  //             phone: formik.values.phone ? `+${formik.values.phone}` : '',
  //           },
  //           firstName: formik.values.firstName,
  //           lastName: formik.values.lastName,
  //           photoUrl: '',
  //           title: '',
  //           username: formik.values.email,
  //           serviceCompanyId: user?.userAccount.serviceCompany.id || '',
  //         },
  //       },
  //     });
  //     setOpenDialog(false);
  //   };

  //   const onDelete = async () => {
  //     await deleteContact({
  //       contactId: activeContact?.id || '',
  //     });

  //     setOpenCancelConfirm(false);
  //   };

  // if (isFetching) {
  //   return <CircularProgress />;
  // }

  const {updateAllCategories} = useCategories();

  const onUpdateCategories = async (categoriesDnd: Category[]) => {
    const newCategories: any = [];
    await categoriesDnd.forEach((item, index) => {
      if (item?.children?.length > 0) {
        item.children.forEach((child, indexChild) => {
          newCategories.push({
            ...child,
            parent_id: item.id,
            order: indexChild,
            type: 'link',
          });
        });
      } else {
        console.log('index :>> ', index);
        newCategories.push({
          ...item,
          parent_id: '',
          order: index,
          type: 'container',
        });
      }
    });
    console.log('newCategories :>> ', newCategories);
    updateAllCategories(newCategories);
  };

  return (
    <Box>
      <InfoCard
        header={<Typography variant="subtitle1">Categories</Typography>}
        containerStyles={{flexGrow: 1}}
        headerStyles={{mt: '0.5em'}}
        headerActionIcon={<Typography color="info.main">+ Add</Typography>}
        showHeaderBackground>
        <Box>
          {/* {categories.length > 0 && (
            <DndProvider backend={HTML5Backend}>
              <DndCategories
                categories={categories}
                onUpdateCategories={onUpdateCategories}
              />
            </DndProvider>
          )} */}
          {categories.length > 0 && (
            <CategoriesWidgetNew
              categories={categories}
              onUpdateCategories={onUpdateCategories}
            />
          )}
        </Box>
      </InfoCard>
    </Box>
  );
};
