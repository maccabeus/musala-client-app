import { FC, ReactElement, useContext } from 'react';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { BASE_APP_COLOR } from '../../configs/StyleConstants';

export interface GatewayItemCardProps {
    _id: any
    gatewayId: number
    gatewayName: string
    serialNumber: string
    ip: string
    index: number
    onDetailsClick?: (value: any) => void
    onAddDeviceClick?: (value: any) => void
}

const GatewayItemCard: FC<GatewayItemCardProps> = (props): ReactElement => {
    const { _id,  gatewayId,  gatewayName, serialNumber, ip, index, onDetailsClick, onAddDeviceClick } = props;
    const CardView = () => {
        return (
            <div style={{ marginTop: 0 }} key={_id} >
                <Card sx={{ minWidth: 250, marginBottom: 5 }} >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: BASE_APP_COLOR }} aria-label="recipe">
                                {index+1 }
                            </Avatar>
                        }
                        title={<h3>{gatewayName}</h3>}
                        subheader={<div>IP Address: {ip}</div>}
                    />
                    <CardActions disableSpacing>
                        <Button onClick={() => onDetailsClick ? onDetailsClick(gatewayId) : null}>DEVICE LIST</Button>
                        <Button onClick={() => onAddDeviceClick ? onAddDeviceClick(gatewayId) : null}>NEW DEVICE</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
    return (<CardView />)
}

export default GatewayItemCard;