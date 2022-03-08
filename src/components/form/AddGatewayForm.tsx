import { FC, ReactElement } from 'react';
import Button from "@material-ui/core/Button";
import { useFormStyles } from './styles/FormStyles';
import CustomButton from '../button/CustomButton';


export interface AddGatewayFormProps {
    title?: string
    serialNumber: string
    ip: string
    gatewayName: string
    onAddGatewayClick?: () => void
    onGatewayNameChange?: (e: any) => void
    onIpAddressChange?: (e: any) => void
    onSerialNumberChange?: (e: any) => void
}

const AddGatewayForm: FC<AddGatewayFormProps> = (props): ReactElement => {

    const { title, gatewayName, serialNumber, ip, onAddGatewayClick,
        onGatewayNameChange, onIpAddressChange, onSerialNumberChange
    } = props;

    const styles = useFormStyles()

    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>
                {title ? title : null}
            </div>

            <div className={styles.content}>
                <label>
                    <input name="gateway-name" className={styles.input} type="text" onChange={onGatewayNameChange} value={gatewayName} placeholder="Gateway Name" />
                </label>
                <label>
                    <input name="serial-number" className={styles.input} type="text" onChange={onSerialNumberChange} value={serialNumber} placeholder="Serial Number" />
                </label>
                <label>
                    <input name="ip" className={styles.input} type="text" value={ip} onChange={onIpAddressChange} placeholder="IP Address" />
                </label>
                <div>
                <CustomButton text="ADD GATEWAY" onButtonClick={onAddGatewayClick} />
                </div>
            </div>

        </div>
    )
}
export default AddGatewayForm;