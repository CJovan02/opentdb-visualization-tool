import {Alert, AlertTitle, Button, Stack} from "@mui/material";
import RefreshIcon from "@mui/material/Icon";

type ErrorDisplayProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
};

export function ErrorDisplay({title = "Something went wrong", message, onRetry}: ErrorDisplayProps) {
    return (
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{width: "100%", py: 4}}
        >
            <Alert severity="error" sx={{width: "100%", maxWidth: 500}}>
                <AlertTitle>{title}</AlertTitle>
                {message ?? "An unexpected error occurred."}
            </Alert>

            {onRetry && (
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<RefreshIcon/>}
                    onClick={onRetry}
                >
                    Retry
                </Button>
            )}
        </Stack>
    );
}
