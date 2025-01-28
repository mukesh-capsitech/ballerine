import { describe, expect, test } from 'vitest';
import { IValidationSchema } from '../../../Validator';
import { IFormElement } from '../../types';
import { convertFormElementsToValidationSchema } from './convert-form-emenents-to-validation-schema';

describe('convertFormElementsToValidationSchema', () => {
  const case1 = [
    [{ id: '1', valueDestination: 'test', validate: [], element: 'textinput' }] as IFormElement[],
    [
      { id: '1', valueDestination: 'test', validators: [], children: undefined },
    ] as IValidationSchema[],
  ] as const;

  const case2 = [
    [
      {
        id: 'fieldlist',
        valueDestination: 'test',
        validate: [
          {
            type: 'required',
          },
        ],
        element: 'fieldlist',
        children: [
          {
            id: 'textinput',
            valueDestination: 'test',
            element: 'textinput',
            validate: [
              {
                type: 'required',
              },
            ],
          },
          {
            id: 'nested-fieldlist',
            valueDestination: 'test',
            element: 'fieldlist',
            validate: [{ type: 'required' }],
            children: [
              {
                id: 'nested-textinput',
                valueDestination: 'test',
                element: 'textinput',
                validate: [
                  {
                    type: 'required',
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as IFormElement[],
    [
      {
        id: 'fieldlist',
        valueDestination: 'test',
        validators: [{ type: 'required' }],
        children: [
          { id: 'textinput', valueDestination: 'test', validators: [{ type: 'required' }] },
          {
            id: 'nested-fieldlist',
            valueDestination: 'test',
            validators: [{ type: 'required' }],
            children: [
              {
                id: 'nested-textinput',
                valueDestination: 'test',
                validators: [{ type: 'required' }],
              },
            ],
          },
        ],
      },
    ],
  ] as const;

  const case3 = [
    [
      {
        id: 'somenestedfield',
        children: [
          {
            id: 'field',
            valueDestination: 'test',
            validate: [{ type: 'required' }],
          },
          {
            id: 'nestedmore',
            children: [
              {
                id: 'nestedmore2',
                valueDestination: 'test',
                validate: [{ type: 'required' }],
              },
            ],
          },
          {
            id: 'level1',
            children: [
              {
                id: 'level2',
                children: [
                  {
                    id: 'level3',
                    children: [
                      {
                        id: 'level4',
                        children: [
                          {
                            id: 'level5',
                            valueDestination: 'test',
                            validate: [{ type: 'required' }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ] as IFormElement[],
    [
      { id: 'field', valueDestination: 'test', validators: [{ type: 'required' }] },
      {
        id: 'nestedmore2',
        valueDestination: 'test',
        validators: [{ type: 'required' }],
      },
      {
        id: 'level5',
        valueDestination: 'test',
        validators: [{ type: 'required' }],
      },
    ] as const,
  ] as const;

  const case4 = [
    [
      {
        id: 'container',
        children: [
          {
            id: 'container-2',
            children: [
              {
                id: 'fieldlist',
                element: 'fieldlist',
                valueDestination: 'test',
                children: [
                  {
                    id: 'textinput',
                    element: 'textinput',
                    valueDestination: 'test[$0]',
                  },
                ],
              },
            ],
          },
          {
            id: 'container-4',
            children: [
              {
                id: 'testfield-2',
                element: 'textinput',
                valueDestination: 'test',
              },
            ],
          },
        ],
      },
    ] as IFormElement[],
    [
      {
        id: 'fieldlist',
        valueDestination: 'test',
        children: [
          {
            id: 'textinput',
            valueDestination: 'test[$0]',
          },
        ],
      },
      {
        id: 'testfield-2',
        valueDestination: 'test',
      },
    ] as const,
  ] as const;

  const cases = [case1, case2, case3, case4];

  test.each(cases)('should convert form elements to validation schema', (schema, output) => {
    const validationSchema = convertFormElementsToValidationSchema(schema);
    expect(validationSchema).toEqual(output);
  });
});
