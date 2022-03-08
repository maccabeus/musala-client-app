import { FC, ReactElement } from 'react';
import Button from "@material-ui/core/Button";
import { useFormStyles } from './styles/FormStyles';
import CustomButton from '../button/CustomButton';


export interface AddDeviceFormProps {
    title?: string
    vendorRef?: any
    statusRef?: any
    vendor?: string
    status?: string
    onAddDeviceClick?: () => void
    onVendorChange?: (e: any) => void
    onStatusChange?: (e: any) => void
}

const AddDeviceForm: FC<AddDeviceFormProps> = (props): ReactElement => {

    const { title, onAddDeviceClick, onStatusChange, onVendorChange, vendor, status } = props;

    const styles = useFormStyles()

    return (
        <div className={styles.form}>
            <div className={styles.formHeader}>
                {title ? title : null}
            </div>

            <div className={styles.content}>
                <label>
                    <input name="vendor" className={styles.input} type="text" onChange={onVendorChange} value={vendor} placeholder="Vendor Name" />
                </label>
                <label>
                    <select name="status" onChange={onStatusChange} value={status} className={styles.input}>
                        <option value="">Select Status</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                    </select>
                </label>
                <div>
                    <CustomButton text="ADD DEVICE" onButtonClick={onAddDeviceClick} />
                </div>
            </div>

        </div>
    )
}
export default AddDeviceForm;