import { IFormElement } from '@/components/organisms/Form/DynamicForm/types';
import { describe, expect, it } from 'vitest';
import { IDocumentFieldParams } from '../../../../DocumentField';
import { getFileOrFileIdFromDocumentsList } from './get-file-or-fileid-from-documents-list';

describe('getFileOrFileIdFromDocumentsList', () => {
  const mockElement: IFormElement<'documentfield', IDocumentFieldParams> = {
    id: 'test-doc',
    element: 'documentfield',
    valueDestination: 'documents',
    params: {
      template: {
        id: 'doc-1',
        pages: [],
      },
      pageIndex: 0,
      pageProperty: 'ballerineFileId',
    },
  };

  it('should return undefined when documentsList is empty', () => {
    const result = getFileOrFileIdFromDocumentsList([], mockElement);
    expect(result).toBeUndefined();
  });

  it('should return undefined when document with matching template id is not found', () => {
    const documentsList = [
      {
        id: 'different-doc',
        pages: [],
      },
    ] as Array<IDocumentFieldParams['template']>;
    const result = getFileOrFileIdFromDocumentsList(documentsList, mockElement);
    expect(result).toBeUndefined();
  });

  it('should return file id when matching document is found', () => {
    const documentsList = [
      {
        id: 'doc-1',
        pages: [
          {
            ballerineFileId: 'file-123',
          },
        ],
      },
    ] as unknown as Array<IDocumentFieldParams['template']>;
    const result = getFileOrFileIdFromDocumentsList(documentsList, mockElement);
    expect(result).toBe('file-123');
  });

  it('should use default values when params are not provided', () => {
    const elementWithoutParams: IFormElement<'documentfield', IDocumentFieldParams> = {
      id: 'test-doc',
      element: 'documentfield',
      valueDestination: 'documents',
    };

    const documentsList = [
      {
        id: undefined,
        pages: [
          {
            ballerineFileId: 'file-123',
          },
        ],
      },
    ] as unknown as Array<IDocumentFieldParams['template']>;

    const result = getFileOrFileIdFromDocumentsList(documentsList, elementWithoutParams);
    expect(result).toBe('file-123');
  });

  it('should handle custom pageProperty and pageIndex', () => {
    const customElement = {
      ...mockElement,
      params: {
        ...mockElement.params,
        pageProperty: 'customFileId',
        pageIndex: 1,
        template: {
          id: 'doc-1',
          pages: [{ customFileId: 'file-1' }, { customFileId: 'file-2' }],
        },
      },
    } as unknown as IFormElement<'documentfield', IDocumentFieldParams>;

    const documentsList = [
      {
        id: 'doc-1',
        pages: [{ customFileId: 'file-1' }, { customFileId: 'file-2' }],
      },
    ] as unknown as Array<IDocumentFieldParams['template']>;

    const result = getFileOrFileIdFromDocumentsList(documentsList, customElement);
    expect(result).toBe('file-2');
  });
});
