"use client";
import { useRequirementData } from "@/hooks/useRequirementData";
import ParsedRequirementText from "./parsed-requirement-text";
import RequirementFields from "@/components/ui/requirement-fields";
import { Requirement } from "@/types/requirement";
import { Button, Chip, Snackbar, Stack, Typography } from "@mui/joy";
import UseTemplateButton from "./use-template-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RequirementWrapperProps = {
	initialRequirement: Requirement;
};

const RequirementWrapper = ({ initialRequirement }: RequirementWrapperProps) => {
	const { requirement, parsedText, updateRequirement } = useRequirementData(initialRequirement);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [requirementId, setRequirementId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleGotoRequirement = () => {
		setLoading(true);
		setSnackbarOpen(false);
		if (requirementId) {
			router.push(`/requirements/${requirementId}`);
		}
		setLoading(false);
	};

	return (
		<>
			<Stack gap={2}>
				<Stack direction="row" gap={1} justifyContent="space-between">
					<Stack direction="row" spacing={1}>
						<Chip color="neutral" variant="outlined">
							Pola obowiązkowe
						</Chip>
						<Chip color="neutral" variant="soft">
							Pola opcjonalne
						</Chip>
					</Stack>
					<UseTemplateButton requirement={requirement} setReqId={setRequirementId} setSnackbar={setSnackbarOpen} />
				</Stack>
				<Stack gap={1}>
					<Typography level="body-md" sx={{ color: "text.secondary", fontWeight: 600 }}>
						Dostępne pola
					</Typography>
					<RequirementFields requirement={requirement} updateRequirement={updateRequirement} />
				</Stack>
				<Stack gap={1}>
					<Typography level="body-md" sx={{ color: "text.secondary", fontWeight: 600 }}>
						Treść wymagania
					</Typography>
					<ParsedRequirementText parsedText={parsedText} />
				</Stack>
			</Stack>
			<Snackbar
				open={snackbarOpen}
				variant="soft"
				color="success"
				onClose={() => setSnackbarOpen(false)}
				endDecorator={
					requirementId ? (
						<Button onClick={handleGotoRequirement} size="sm" variant="soft" color="success" loading={loading}>
							Zobacz
						</Button>
					) : null
				}
			>
				{`Wymaganie ${requirement.id} zostało utworzone`}
			</Snackbar>
		</>
	);
};

export default RequirementWrapper;
