import { Chip } from '@/components/molecules/inputs/MultiSelect/components/Chip';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { MultiSelect, MultiSelectSelectedItemRenderer, MultiSelectValue } from './MultiSelect';

export default {
  component: MultiSelect,
};

const options = new Array(20)
  .fill(null)
  .map((_, index) => ({ value: `item-${index}`, label: `Item-${index}` }));

const DefaultComponent = () => {
  const [value, setValue] = useState<MultiSelectValue[]>([]);

  const renderSelected: MultiSelectSelectedItemRenderer = useCallback((params, option) => {
    return (
      <Chip key={option.value} className="h-6">
        <Chip.Label text={option.label} variant="secondary" />
        <Chip.UnselectButton
          {...params.unselectButtonProps}
          icon={<X className="hover:text-muted-foreground h-3 w-3 text-white" />}
        />
      </Chip>
    );
  }, []);

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={setValue}
      renderSelected={renderSelected}
    />
  );
};

export const Default = {
  render: DefaultComponent,
};

const DisabledComponent = () => {
  const [value, setValue] = useState<MultiSelectValue[]>([]);

  const renderSelected: MultiSelectSelectedItemRenderer = useCallback((params, option) => {
    return (
      <Chip key={option.value} className="h-6">
        <Chip.Label text={option.label} variant="secondary" />
        <Chip.UnselectButton
          {...params.unselectButtonProps}
          icon={<X className="hover:text-muted-foreground h-3 w-3 text-white" />}
        />
      </Chip>
    );
  }, []);

  return (
    <MultiSelect
      value={value}
      options={options}
      disabled
      onChange={setValue}
      renderSelected={renderSelected}
    />
  );
};

export const Disabled = {
  render: DisabledComponent,
};
