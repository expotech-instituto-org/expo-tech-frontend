import { Box, LinearProgress, Typography } from "@mui/material";

export default function MetaProgressBar({
  value = 7500,
  goal = 10000,
}: {
  value: number;
  goal: number;
}) {
  const progress = Math.min((value / goal) * 100, 100);

  return (
    <Box sx={{ width: "95%", my: 4 }} className="mx-auto">
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <h1 className="text-2xl font-bold">
          Progresso da meta
        </h1>
        <h2 className="text-xl font-semibold">
          {`${progress.toFixed(1)}%`}
        </h2>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 15,
          borderRadius: 8,
          "& .MuiLinearProgress-bar": {
            borderRadius: 8,
            backgroundColor: "var(--azul-primario)",
          },
        }}
      />

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography variant="body2" color="text.secondary">
          R$ {value.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          de R$ {goal.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}
