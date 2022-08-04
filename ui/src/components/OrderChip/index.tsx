import {StatusChip} from '../StatusChip/StatusChip';
import {StatusOder} from '../../types/orders';

interface Props {
  status: StatusOder;
}

export const OrderChip = ({status}: Props) => {
  switch (status) {
    case 'pending':
      return <StatusChip color="primary" label="Pending" />;
    case 'processing':
      return <StatusChip color="primary" label="Processing" />;
    case 'approved':
      return <StatusChip color="primary" label="Approved" />;
    case 'open':
      return <StatusChip color="action.active" label="Open" />;
    case 'removed':
      return <StatusChip color="secondary" label="Removed" />;
    case 'canceled':
      return <StatusChip color="info" label="Canceled" />;
    case 'complete':
      return <StatusChip color="success" label="Complete" />;
    case 'closed':
      return <StatusChip color="info" label="Closed" />;
    default:
      return null;
  }
};
