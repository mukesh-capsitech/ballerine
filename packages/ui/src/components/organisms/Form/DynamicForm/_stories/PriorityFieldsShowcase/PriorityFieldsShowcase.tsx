import { AnyObject } from '@/common';
import { useState } from 'react';
import { JSONEditorComponent } from '../../../Validator/_stories/components/JsonEditor/JsonEditor';
import { DynamicFormV2 } from '../../DynamicForm';
import { IDynamicFormProps, IFormElement } from '../../types';

const schema: Array<IFormElement<any, any>> = [
  {
    id: 'TextField',
    element: 'textfield',
    valueDestination: 'textfield',
    params: {
      label: 'Text Field',
      placeholder: 'Enter text',
      description: 'This is a text field for entering any text value',
    },
    validate: [],
  },
  {
    id: 'AutocompleteField',
    element: 'autocompletefield',
    valueDestination: 'autocomplete',
    params: {
      label: 'Autocomplete Field',
      placeholder: 'Select an option',
      description: 'This is an autocomplete field that provides suggestions as you type',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
  },
  {
    id: 'CheckboxListField',
    element: 'checkboxlistfield',
    valueDestination: 'checkboxlist',
    params: {
      label: 'Checkbox List Field',
      description: 'Select multiple options from this list of checkboxes',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
  },
  {
    id: 'DateField',
    element: 'datefield',
    valueDestination: 'date',
    params: {
      label: 'Date Field',
      description: 'Select a date from the calendar',
    },
  },
  {
    id: 'MultiselectField',
    element: 'multiselectfield',
    valueDestination: 'multiselect',
    params: {
      label: 'Multiselect Field',
      description: 'Select multiple options from the dropdown list',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
  },
  {
    id: 'SelectField',
    element: 'selectfield',
    valueDestination: 'select',
    params: {
      label: 'Select Field',
      description: 'Choose a single option from the dropdown list',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
  },
  {
    id: 'CheckboxField',
    element: 'checkboxfield',
    valueDestination: 'checkbox',
    params: {
      label: 'Checkbox Field',
      description: 'Toggle this checkbox for a yes/no selection',
    },
  },
  {
    id: 'PhoneField',
    element: 'phonefield',
    valueDestination: 'phone',
    params: {
      label: 'Phone Field',
      description: 'Enter a phone number with country code selection',
      defaultCountry: 'il',
    },
  },
  {
    id: 'RadioField',
    element: 'radiofield',
    valueDestination: 'radio',
    params: {
      label: 'Radio Field',
      description: 'Select one option from these radio buttons',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
    },
  },
  {
    id: 'TagsField',
    element: 'tagsfield',
    valueDestination: 'tags',
    params: {
      label: 'Tags Field',
      description: 'Add multiple tags by typing and pressing enter',
    },
  },
  {
    id: 'FileField',
    element: 'filefield',
    valueDestination: 'file',
    params: {
      label: 'File Field',
      placeholder: 'Select File',
      description: 'Upload a file from your device',
    },
  },
  {
    id: 'FieldList',
    element: 'fieldlist',
    valueDestination: 'fieldlist',
    params: {
      label: 'Field List',
      description: 'A list of repeatable form fields that can be added or removed',
    },
    children: [
      {
        id: 'Nested-TextField',
        element: 'textfield',
        valueDestination: 'fieldlist[$0]',
        params: {
          label: 'Text Field',
          placeholder: 'Enter text',
          description: 'Enter text for this list item',
        },
        validate: [
          {
            type: 'required',
            value: {},
            message: 'List item is required',
          },
        ],
      },
    ],
  },
  {
    id: 'SubmitButton',
    element: 'submitbutton',
    valueDestination: 'submitbutton',
    params: {
      label: 'Submit Button',
    },
  },
];

const priorityFields = [
  { id: 'TextField', reason: 'This is a priority field' },
  { id: 'AutocompleteField', reason: 'This is a priority field' },
];

export const PriorityFieldsShowcase = ({
  behavior,
}: NonNullable<IDynamicFormProps<AnyObject>['priorityFieldsParams']>) => {
  const [context, setContext] = useState<AnyObject>({});

  return (
    <div className="flex h-screen w-full flex-row flex-nowrap gap-4">
      <div className="w-1/2">
        <DynamicFormV2
          elements={schema}
          values={context}
          onSubmit={() => {
            console.log('onSubmit');
          }}
          onChange={setContext}
          priorityFieldsParams={{
            behavior,
          }}
          priorityFields={priorityFields}
          // onEvent={console.log}
        />
      </div>
      <div className="w-1/2">
        <JSONEditorComponent value={context} readOnly />
      </div>
    </div>
  );
};
