import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Refresh from "@mui/icons-material/Refresh";

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
                    startIcon={<Refresh />}
                    onClick={onRetry}
                >
                    Retry
                </Button>
            )}
        </Stack>
    );
}
