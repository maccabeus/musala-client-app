import DeviceItemCard from "./DeviceItemCard";
import { FC, ReactElement } from "react";
import { useDeviceListViewStyles } from "./styles/DeviceListViewStyles";
import { useDeviceItemCardStyles } from "./styles/DeviceItemCardStyles";

export interface DeviceListViewProps {
    data: Array<any>,
    selectedGateway?: string | null;
    onDeleteDeviceClick: (gatewayId: number, deviceId: number) => void
}

const DeviceListView: FC<DeviceListViewProps> = (props): ReactElement => {

    const { data, onDeleteDeviceClick } = props;
    const styles = useDeviceListViewStyles();
    const cardStyles = useDeviceItemCardStyles();

    const List = () => {
        if (!data || data.length <= 0) {
            return (<div>No Device found</div>)
        }
        const deviceList = data.map((row: any, index: number) => {
            let cardStyle: any = null;
            const indexMod: number = index + 1;

            if (indexMod % 2 === 0) {
                cardStyle = cardStyles.baseCard;
            } else if (indexMod % 3===0) {
                cardStyle = cardStyles.yellowCard
            } else {
                cardStyle = cardStyles.lightCard
            }

            return (<DeviceItemCard className={cardStyle} key={row.id}    {...row} onDeleteDeviceClick={onDeleteDeviceClick} />)
        })
        return <>{deviceList}</>
    }
    return (
        <>
            <h2>Available Devices</h2>
            <div className={styles.root}>
                <List />
            </div>
        </>
    )
}

export default DeviceListView;