import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Add these plugins to dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

import { createColumnHelper } from '@tanstack/react-table';
import { TBusinessReport } from '@/domains/business-reports/fetchers';
import { titleCase } from 'string-ts';

import { ctw } from '@/common/utils/ctw/ctw';
import { getSeverityFromRiskScore } from '@ballerine/common';
import {
  Badge,
  CheckCircle,
  severityToClassName,
  TextWithNAFallback,
  WarningFilledSvg,
} from '@ballerine/ui';
import { useEllipsesWithTitle } from '@/common/hooks/useEllipsesWithTitle/useEllipsesWithTitle';
import { CopyToClipboardButton } from '@/common/components/atoms/CopyToClipboardButton/CopyToClipboardButton';
import { Minus } from 'lucide-react';
import {
  MERCHANT_REPORT_STATUSES_MAP,
  MERCHANT_REPORT_TYPES_MAP,
} from '@/domains/business-reports/constants';
import React from 'react';
import { IndicatorCircle } from '@/common/components/atoms/IndicatorCircle/IndicatorCircle';
import { TooltipTrigger, TooltipContent, Tooltip } from '@ballerine/ui';

const columnHelper = createColumnHelper<TBusinessReport>();

const SCAN_TYPES = {
  ONBOARDING: 'Onboarding',
  MONITORING: 'Monitoring',
} as const;

const REPORT_STATUS_TO_DISPLAY_STATUS = {
  [MERCHANT_REPORT_STATUSES_MAP.completed]: 'Ready for Review',
  [MERCHANT_REPORT_STATUSES_MAP['quality-control']]: 'Quality Control',
} as const;

const REPORT_TYPE_TO_SCAN_TYPE = {
  [MERCHANT_REPORT_TYPES_MAP.MERCHANT_REPORT_T1]: SCAN_TYPES.ONBOARDING,
  [MERCHANT_REPORT_TYPES_MAP.ONGOING_MERCHANT_REPORT_T1]: SCAN_TYPES.MONITORING,
} as const;

export const columns = [
  columnHelper.accessor('companyName', {
    cell: info => {
      const companyName = info.getValue();

      return (
        <TextWithNAFallback className={`ms-4 font-semibold`}>{companyName}</TextWithNAFallback>
      );
    },
    header: 'Company Name',
  }),
  columnHelper.accessor('website', {
    cell: info => {
      const website = info.getValue();

      return <TextWithNAFallback>{website}</TextWithNAFallback>;
    },
    header: 'Website',
  }),
  columnHelper.accessor('riskScore', {
    cell: info => {
      const riskScore = info.getValue();
      const severity = getSeverityFromRiskScore(riskScore);

      return (
        <div className="flex items-center gap-2">
          {!riskScore && riskScore !== 0 && <TextWithNAFallback className={'py-0.5'} />}
          {(riskScore || riskScore === 0) && (
            <Badge
              className={ctw(
                severityToClassName[
                  (severity?.toUpperCase() as keyof typeof severityToClassName) ?? 'DEFAULT'
                ],
                'w-20 py-0.5 font-bold',
              )}
            >
              {titleCase(severity ?? '')}
            </Badge>
          )}
        </div>
      );
    },
    header: 'Risk Level',
  }),
  columnHelper.accessor('monitoringStatus', {
    cell: ({ getValue }) => {
      return getValue() ? (
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <CheckCircle
              size={18}
              className={`stroke-background`}
              containerProps={{
                className: 'me-3 bg-success mt-px',
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            This website is actively monitored for changes on a recurring basis
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <IndicatorCircle
              size={18}
              className={`stroke-transparent`}
              containerProps={{
                className: 'bg-slate-500/20',
              }}
            />
          </TooltipTrigger>
          <TooltipContent>This website is not currently monitored for changes</TooltipContent>
        </Tooltip>
      );
    },
    header: () => (
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <span className={`max-w-[20ch] truncate`}>Monitored</span>
        </TooltipTrigger>
        <TooltipContent>
          Indicates whether this website is being monitored for changes
        </TooltipContent>
      </Tooltip>
    ),
  }),
  columnHelper.accessor('reportType', {
    cell: info => {
      const scanType = REPORT_TYPE_TO_SCAN_TYPE[info.getValue()];

      return <TextWithNAFallback>{scanType}</TextWithNAFallback>;
    },
    header: 'Scan Type',
  }),
  columnHelper.accessor('isAlert', {
    cell: ({ getValue }) => {
      return getValue() ? (
        <WarningFilledSvg className={`d-6`} />
      ) : (
        <Minus className={`text-[#D9D9D9] d-6`} />
      );
    },
    header: 'Alert',
  }),
  columnHelper.accessor('createdAt', {
    cell: info => {
      const createdAt = info.getValue();

      if (!createdAt) {
        return <TextWithNAFallback>{createdAt}</TextWithNAFallback>;
      }

      // Convert UTC time to local browser time
      const localDateTime = dayjs.utc(createdAt).local();

      const date = localDateTime.format('MMM DD, YYYY');
      const time = localDateTime.format('HH:mm');

      return (
        <div className={`flex flex-col space-y-0.5`}>
          <span>{date}</span>
          <span className={`text-xs text-[#999999]`}>{time}</span>
        </div>
      );
    },
    header: 'Created At',
  }),
  // columnHelper.accessor('merchantId', {
  //   cell: info => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks -- ESLint doesn't like `cell` not being `Cell`.
  //     const { ref, styles } = useEllipsesWithTitle<HTMLSpanElement>();
  //
  //     const id = info.getValue();
  //
  //     return (
  //       <div className={`flex w-full max-w-[12ch] items-center space-x-2`}>
  //         <TextWithNAFallback style={{ ...styles, width: '70%' }} ref={ref}>
  //           {id}
  //         </TextWithNAFallback>
  //
  //         <CopyToClipboardButton textToCopy={id ?? ''} />
  //       </div>
  //     );
  //   },
  //   header: 'Merchant ID',
  // }),
  columnHelper.accessor('id', {
    cell: info => {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- ESLint doesn't like `cell` not being `Cell`.
      const { ref, styles } = useEllipsesWithTitle<HTMLSpanElement>();

      const id = info.getValue();

      return (
        <div className={`flex w-full max-w-[12ch] items-center space-x-2`}>
          <TextWithNAFallback style={{ ...styles, width: '70%' }} ref={ref}>
            {id}
          </TextWithNAFallback>

          <CopyToClipboardButton textToCopy={id ?? ''} />
        </div>
      );
    },
    header: 'Report ID',
  }),
  columnHelper.accessor('status', {
    cell: info => {
      const status = info.getValue();

      return (
        <TextWithNAFallback
          className={ctw('font-semibold', {
            'text-slate-400': status === MERCHANT_REPORT_STATUSES_MAP.completed,
            'text-destructive': status === MERCHANT_REPORT_STATUSES_MAP.failed,
          })}
        >
          {titleCase(
            REPORT_STATUS_TO_DISPLAY_STATUS[
              status as keyof typeof REPORT_STATUS_TO_DISPLAY_STATUS
            ] ?? status,
          )}
        </TextWithNAFallback>
      );
    },
    header: 'Status',
  }),
];
