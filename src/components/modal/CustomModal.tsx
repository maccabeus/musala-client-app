import { FC, ReactElement } from 'react';
import Modal from '@mui/material/Modal';
import { useCustomModalStyles } from './styles/CustomModalStyles';


export interface ModalProps {
    open: boolean
    children?: any
    onClose?: () => void
}

const CustomModal: FC<ModalProps> = (props): ReactElement => {
    const { open, children, onClose } = props;
    const styles= useCustomModalStyles();
    return (
        <Modal className={styles.modal}
            open={open}
            onClose={onClose} >
            {children}
        </Modal>
    )
}
export default CustomModal;