import type { CardProps } from '@/common/interfaces';
import { CardNormal } from './CardNormal';
import { CardDetails } from './CardDetails';
export const Card = ({ title, data, children, onDelete, onView, className, type }: CardProps) => {
    const renderCardNormal = type === 'normal' && (
        <CardNormal
            className={className}
            title={title}
            data={data}
            children={children}
            onView={onView}
        />
    );

    const renderCardDetails = type === 'detail' && (
        <CardDetails
            children={children}
            data={data}
            className={className}
        />
    );

    return (
        <>
            {renderCardNormal}
            {renderCardDetails}
        </>
    );
};