import { AnyArray, TypesafeOmit } from '../../../../common/types';
import { TDocument } from '@ballerine/common';
import { toTitleCase } from 'string-ts';
import { TDropdownOption } from '@/lib/blocks/components/EditableDetails/types';

const composeDataFormCell = (
  cellName: string,
  categoryDropdownOptions: TDropdownOption[],
  value: string,
  isEditable: boolean,
) => {
  return {
    [cellName]: {
      title: cellName,
      type: 'string',
      dropdownOptions: categoryDropdownOptions,
      value: value,
      isEditable,
    },
  };
};
const uniqueArrayByKey = (array: AnyArray, key: PropertyKey) => {
  return [...new Map(array.map(item => [item[key], item])).values()] as TDropdownOption[];
};

export const composePickableCategoryType = (
  categoryValue: string,
  typeValue: string,
  documentsSchemas: TDocument[],
  config?: Record<PropertyKey, any> | null,
) => {
  const documentCategoryDropdownOptions: TDropdownOption[] = [];
  const documentTypesDropdownOptions: TDropdownOption[] = [];
  documentsSchemas.forEach(document => {
    const category = document.category;

    if (category) {
      documentCategoryDropdownOptions.push({
        value: category,
        label: toTitleCase(category),
      });
    }

    const type = document.type;

    if (type) {
      documentTypesDropdownOptions.push({
        dependantOn: 'category',
        dependantValue: category,
        value: type,
        label: toTitleCase(type),
      });
    }
  });

  const categoryDropdownOptions = uniqueArrayByKey(documentCategoryDropdownOptions, 'value');
  const typeDropdownOptions = documentTypesDropdownOptions;
  const isEditable = !config?.isLockedDocumentCategoryAndType;

  return {
    ...composeDataFormCell('category', categoryDropdownOptions, categoryValue, isEditable),
    ...composeDataFormCell('type', typeDropdownOptions, typeValue, isEditable),
  };
};
export const isExistingSchemaForDocument = (documentsSchemas: TDocument[]) => {
  return documentsSchemas?.length > 0;
};

export const extractCountryCodeFromDocuments = (documents: TDocument[]) => {
  return documents?.find(document => {
    return !!document?.issuer?.country;
  })?.issuer?.country;
};

export const omitPropsFromObject = <
  TObj extends Record<PropertyKey, unknown>,
  TProps extends Array<keyof TObj>,
>(
  obj: TObj,
  ...props: TProps
): TypesafeOmit<TObj, TProps[number]> => {
  const result = { ...obj };

  props.forEach(function (prop) {
    delete result[prop];
  });

  return result;
};
