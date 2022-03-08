import Button from "@material-ui/core/Button";
import { FC } from "react";
import { useCustomButtonStyles} from "./styles/CustomButtonStyles";

export interface CustomButtonProps {
    text: string
    onButtonClick?: (value: any) => void
}

const CustomButton: FC<CustomButtonProps> = (props) => {
    const {onButtonClick, text } = props;
    const styles = useCustomButtonStyles();
    return (
        <Button className={styles.button} onClick={onButtonClick}>
            {text}
        </Button>
    )
}
export default CustomButton;