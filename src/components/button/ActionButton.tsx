import Button from "@material-ui/core/Button";
import { FC } from "react";
import { useActionButtonStyles } from "./styles/ActionButtonStyles";

export interface ActionButtonProps {
    text: string
    onButtonClick: (value: any) => void
}

const ActionButton: FC<ActionButtonProps> = (props) => {
    const {onButtonClick, text } = props;
    const styles = useActionButtonStyles();
    return (
        <Button className={styles.round} onClick={onButtonClick}>
            {text}
        </Button>
    )
}

export default ActionButton;