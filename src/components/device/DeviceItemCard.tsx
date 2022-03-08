import { FC, ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { useDeviceItemCardStyles} from "./styles/DeviceItemCardStyles";

export interface DeviceItemCardProps {
    _id: any
    gatewayId: number
    deviceId: number
    vendor: string
    deviceUID: string
    status: string,
    className?: string
    onDeleteDeviceClick: (gatewayId: number, deviceId: number) => void
}

const DeviceItemCardP: FC<DeviceItemCardProps> = (props): ReactElement => {
    const { _id, gatewayId, deviceId, vendor, status, deviceUID, className, onDeleteDeviceClick } = props;
    const styles= useDeviceItemCardStyles();

    const CardView = () => {
        const key=`${gatewayId}${deviceId}`;

        return (
            <div key={key}  className={className? className : styles.baseCard} >
                <CardActionArea className={styles.contentArea}>
                    <div className={styles.cardLabel}><strong>Device Vendor : </strong>{vendor}</div>
                    <div className={styles.cardLabel}><strong>Device ID : </strong>{deviceId}</div>
                    <div className={styles.cardLabel}><strong>Device Status : </strong>{status}</div>
                </CardActionArea>
                <CardActions>
                    <DeleteIcon className={styles.icon} onClick={() => onDeleteDeviceClick ? onDeleteDeviceClick(gatewayId, deviceId) : null} />
                </CardActions>
            </div>
        )
    }

    return (<CardView />)
}

export default DeviceItemCardP;