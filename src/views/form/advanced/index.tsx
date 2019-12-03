import * as React from 'react';
import BasicForm from '../basic';

const AdvancedForm: React.FC = () => {
    const basicFormRef = React.useRef(null);

    React.useEffect(() => {
        console.log(basicFormRef);
    });

    return (
        <div>
            Form advanced
            <BasicForm name={'Basic form'} ref={basicFormRef} />
        </div>
    );
};

export default AdvancedForm;
