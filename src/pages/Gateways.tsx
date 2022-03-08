import { FC, ReactElement, useCallback, useEffect, useRef, useState, } from "react";
import Box from "@mui/material/Box";
import { API_BASE_PATH, DEVICE_PATH, DEVICE_DELETE_PATH, GATEWAY_PATH } from "../configs/ApiConfigs";
import { apiGetService, apiDeleteService, apiPostService } from "../services/ApiService";
import Layout from "../components/layout/Layout";
import GatewayListView from "../components/gateway/GatewayListView";
import DeviceListView from "../components/device/DeviceListView";
import CustomModal from "../components/modal/CustomModal";
import AddDeviceForm, { AddDeviceFormProps } from "../components/form/AddDeviceForm";
import CustomAlert, { AlertInterface } from "../components/modal/CustomAlert";
import AppNavigationBar from "../components/navigation/NavigationBar";
import ActionButton from "../components/button/ActionButton";
import AddGatewayForm, { AddGatewayFormProps } from "../components/form/AddGatewayForm";
import { useGatewayStyles } from "./styles/GatewayStyles";

const Gateways: FC<any> = (): ReactElement => {

    const styles = useGatewayStyles();

    const [gatewayList, setGatewayList] = useState<Array<any>>([]);
    const [deviceList, setDeviceList] = useState<Array<any>>([]);
    const [addDeviceModalState, setAddDeviceModalState,] = useState<boolean>(false);
    const [currentGatewayId, setCurrentGatewayId] = useState<number | null>(null);
    /**
     * reference for inputs
     */
    const [addDeviceFormInputs, setAddDeviceFormInputs] = useState<AddDeviceFormProps>({
        vendor: "",
        status: ""
    });
    // const addDeviceVendorInputRef = useRef<any>("");
    // const addDeviceStatusInputRef = useRef<any>("");
    /**
     * 
     * Add gateway modal state variables
     */
    const [addGatewayModal, setAddGatewayModal] = useState<boolean>(false);
    /** 
     * Tracks the addGateway form inputs 
     * */
    const [addGatewayFormInputs, setAddGatewayFormInputs] = useState<AddGatewayFormProps>({
        gatewayName: "",
        serialNumber: "",
        ip: ""
    });
    /**
     * Alert props definition
     */
    const [alertProps, setAlertProps] = useState<AlertInterface>({
        open: false,
        title: "Alert",
        type: "info",
        message: ""
    });
    /**
     * Get the list of all added gateways
     * @param filterString Filter string to use for gateway if provided
     */
    const getGatewayList = async (filterString: string | null = null) => {

        let apiPath = `${API_BASE_PATH}${GATEWAY_PATH}`;
        if (filterString) {
            apiPath = `${apiPath}?name=${filterString}`
        }
        const responseData = await apiGetService(apiPath);

        if (responseData && responseData.data && responseData.data.length > 0) {
            setGatewayList(responseData.data);
        } else {
            setGatewayList([]);
        }
    }
    /**
     * Get the list of available devices for a gateway
     * @param gatewayId gateway ID to get list of devices 
     * @returns 
     */
    const getGatewayDevices = async (gatewayId: number | null) => {

        if (!gatewayId) return null;
        let apiPath = `${API_BASE_PATH}${DEVICE_PATH}/${gatewayId}`;
        const responseData = await apiGetService(apiPath);

        if (responseData && responseData.data && responseData.data.length > 0) {
            setDeviceList(responseData.data);
        } else {
            setDeviceList([]);
        }
    }
    /**
     * Get the list of all devices connected to a gateway
     */
    const getCurrentGatewayDevices = useCallback((gatewayId: any): void | null => {
        if (!gatewayId) return null;;
        getGatewayDevices(gatewayId)
    }, [gatewayList])
    /**
     * Add a new device to a gateway
     * @param gatewayId the gateway id 
     */
    const showAddNewDeviceModal = (gatewayId: number) => {
        /**
         * Open the modal to add device
         */
        setAddDeviceModalState(true);
        /** set the current gateway selected */
        setCurrentGatewayId(gatewayId);
    }
    /**
     * Close add new device Modal
     */
    const closeAddNewDeviceWindow = (): void => {
        setAddDeviceModalState(false);
    }
    /**
     * Update the add device form fields values
     */
    const updateAAddDeviceInputValues = useCallback((inputName: string) => {
        return function (e: any): void {
            const inputValue = e.target.value;
            setAddDeviceFormInputs({ ...addDeviceFormInputs, [inputName]: inputValue });
        }
    }, [addDeviceFormInputs]);
    /**
     * Resets add device form inputs
     */
    const resetAddDeviceFormInputs = () => {
        setAddDeviceFormInputs({
            vendor: "",
            status: ""
        })
    }
    /**
     * Delete a device from a gateway
     * @param gatewayId gateway id to delete device from
     * @param deviceId The ID of the device to delete
     */
    const deleteDeviceFromGateway = async (gatewayId: number, deviceId: number) => {

        if (!gatewayId || !deviceId) return null;

        let apiPath = `${API_BASE_PATH}${DEVICE_PATH}${DEVICE_DELETE_PATH}/${gatewayId}/device/${deviceId}`;
        const responseData = await apiDeleteService(apiPath);
        const { error, data, message } = responseData;
        if (responseData) {
            if (error) {
                return showErrorAlert(message, 3000);
            }
            /** get deletion acknowledgement */
            const { acknowledged, deletedCount } = data;
            if (!acknowledged && deletedCount <= 0) {
                return showErrorAlert("Could not delete. Please try again", 3000);
            }
            /** notify user of delete success */
            getGatewayDevices(gatewayId);
            showSuccessAlert(message, 4000);
        } else {
            console.log(error)
        }
    }
    /**
     * Add a new device to an existing gateway
     * @returns {any} return void
     */
    const addNewDeviceToGateway = async (): Promise<any> => {

        if (!currentGatewayId) return null;

        /** get input values */
        const { vendor, status } = addDeviceFormInputs;

        if (!vendor) return showErrorAlert("vendor name must be provided", 3000);
        if (!status) return showErrorAlert("status must be selected", 3000);

        let apiPath = `${API_BASE_PATH}${DEVICE_PATH}/${currentGatewayId}`;

        /** prepare the post data for posting */
        const postData: any = { vendor, status };

        const responseData = await apiPostService(apiPath, postData);

        if (responseData) {
            const { error, message } = responseData;
            if (error) {
                return showErrorAlert(message, 3000);
            }
            /** reload devices  */
            showSuccessAlert(message, 4000)
            getGatewayDevices(currentGatewayId);
            closeAddNewDeviceWindow();
            resetAddDeviceFormInputs();
        } else {
            return showErrorAlert("Error occurs", 3000);
        }
    }
    /**
     * Close the show gateway window 
     */
    const showAddGatewayWindow = () => {
        setAddGatewayModal(true);
    }
    /**
     * Close add gateway window
     */
    const closeAddGatewayWindow = (): void => {
        setAddGatewayModal(false);
    }
    /**
     * Updates the addGateway form inputs values
     */
    const updateAddGatewayInputValues = useCallback((inputName: string) => {
        return function (e: any): void {
            const inputValue = e.target.value;
            setAddGatewayFormInputs({ ...addGatewayFormInputs, [inputName]: inputValue });
        }
    }, [addGatewayFormInputs]);

    /**
     * Reset Add gateway form inputs
     */
    const resetAddGAtewayFormInputs = () => {
        setAddGatewayFormInputs({
            gatewayName: "",
            serialNumber: "",
            ip: ""
        });
    }
    /**
     * Adds a new Gateway
     * @returns {any}
     */
    const addNewGateway = async (): Promise<any> => {

        /** get input values */
        const { gatewayName, serialNumber, ip } = addGatewayFormInputs;

        let apiPath = `${API_BASE_PATH}${GATEWAY_PATH}`;

        /** prepare the post data for posting */
        const postData: any = { gatewayName, serialNumber, ip };
        const responseData = await apiPostService(apiPath, postData);

        if (responseData) {
            const { error, message } = responseData;
            if (error) {
                return showErrorAlert(message, 3000);
            }
            /** reload devices  */
            showSuccessAlert(message, 4000);
            /** refresh the gateway list */
            getGatewayList();
            closeAddGatewayWindow();
            resetAddGAtewayFormInputs();
        } else {
            return showErrorAlert("Error occurs", 3000);
        }
    }
    /**
     * Shows the error alert
     * @param message 
     * @param waitTime time to wait before closing the alert window
     */
    const showErrorAlert = (message: string, waitTime: number | null = null) => {
        setAlertProps({ ...alertProps, open: true, type: "error", message });
        if (waitTime) {
            setTimeout(() => {
                setAlertProps({ ...alertProps, open: false });
            }, waitTime)
        }
    }
    /**
     * Shows the success alert
     * @param message message to display
     * @param waitTime time to wait before closing the alert window
     */
    const showSuccessAlert = (message: string, waitTime: number | null = null) => {
        setAlertProps({ ...alertProps, open: true, type: "success", message });
        if (waitTime) {
            setTimeout(() => {
                setAlertProps({ ...alertProps, open: false });
            }, waitTime)
        }
    }
    /**
     * The application header section
     * @returns {reactElement}
     */
    const HeaderSectionWithButton = () => {
        return (
            <AppNavigationBar
                title="Gateways"
                rightHeader={<ActionButton text='+' onButtonClick={showAddGatewayWindow} />}
            />)
    }
    /**
     * Load All the list of available gateways
     */
    useEffect(() => {
        getGatewayList();
    }, []);
    return (
        <>
            <CustomAlert  {...alertProps} />
            <Layout header={<HeaderSectionWithButton />}>

                {/* --------------- Device Form starts here ------------------ */}
                <CustomModal
                    open={addDeviceModalState}
                    onClose={closeAddNewDeviceWindow}>

                    <AddDeviceForm onAddDeviceClick={addNewDeviceToGateway}
                        {...addDeviceFormInputs}
                        onStatusChange={updateAAddDeviceInputValues("status")}
                        onVendorChange={updateAAddDeviceInputValues("vendor")}
                    />
                </CustomModal>
                {/* --------------- Device Form ends here ------------------ */}

                {/* --------------- Gateway Form starts here ------------------ */}
                <CustomModal
                    open={addGatewayModal}
                    onClose={closeAddGatewayWindow}>
                    <AddGatewayForm {...addGatewayFormInputs} onAddGatewayClick={addNewGateway}
                        onGatewayNameChange={updateAddGatewayInputValues("gatewayName")}
                        onIpAddressChange={updateAddGatewayInputValues("ip")}
                        onSerialNumberChange={updateAddGatewayInputValues("serialNumber")}
                    />
                </CustomModal>
                {/* --------------- Gateway Form ends here -------------------- */}

                <Box className={styles.column}>
                    <GatewayListView data={gatewayList}
                        onDetailsClick={getCurrentGatewayDevices}
                        onAddDeviceClick={showAddNewDeviceModal} />
                </Box>
                <Box className={styles.column}>
                    <DeviceListView data={deviceList} onDeleteDeviceClick={deleteDeviceFromGateway} />
                </Box>
            </Layout>
        </>
    )
}
export default Gateways;