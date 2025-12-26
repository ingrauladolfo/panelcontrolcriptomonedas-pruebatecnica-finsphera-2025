import type { CardProps } from '@/common/interfaces';
import { CardNormal } from './CardNormal';
/* import { CardDetails } from './CardDetails';
 */export const Card = ({ data, children, onDelete, onView, className, type }: CardProps) => {
    const renderCardNormal = type === 'normal' && (
        <CardNormal
            data={data}
            children={children}
            type={type}
            onView={onView}
        />
    );

    /*  const renderCardDetails = type === 'detail' && (
         <CardDetails
             children={children}
             user={user}
             className={className}
         />
     );
  */
    return (
        <>
            {renderCardNormal}
            {/*             {renderCardDetails}
 */}        </>
    );
};