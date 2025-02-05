import { useLocale } from '@/common/hooks/useLocale/useLocale';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback } from 'react';
import { IDataTableProps } from '@/common/components/organisms/DataTable/DataTable';
import { TAlertsList } from '@/domains/alerts/fetchers';

interface IUseAlertsTableLogic {
  data: TAlertsList;
}

export const useAlertsTableLogic = ({ data }: IUseAlertsTableLogic) => {
  const locale = useLocale();
  const { pathname, search } = useLocation();

  const onClick = useCallback(() => {
    sessionStorage.setItem(
      'transaction-monitoring:transactions-drawer:previous-path',
      `${pathname}${search}`,
    );
  }, [pathname, search]);

  const Cell: IDataTableProps<typeof data>['CellContentWrapper'] = ({ cell, children }) => {
    const item = data.find(item => item.id === cell.row.id);

    if (cell.column.id === 'select') {
      return children;
    }

    return (
      <Link
        to={`/${locale}/transaction-monitoring/alerts/${cell.row.id}${search}&businessId=${
          item?.merchant?.id ?? ''
        }&counterpartyId=${item?.counterpartyId ?? ''}`}
        onClick={onClick}
        className={`d-full flex p-4`}
      >
        {children}
      </Link>
    );
  };

  return { Cell };
};
