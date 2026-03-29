/** Project case study route — resolves `/projects/:projectId` from `projectCaseStudies`. */

import { useParams } from "react-router-dom";
import { CASE_STUDY_IDS, PROJECT_CASE_STUDIES } from "../data/projectCaseStudies";
import { CaseStudyUnavailable } from "./CaseStudyUnavailable";
import ProjectCaseStudyPage from "./ProjectCaseStudyPage";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  if (!projectId || !CASE_STUDY_IDS.has(projectId)) {
    return <CaseStudyUnavailable />;
  }

  const config = PROJECT_CASE_STUDIES[projectId];
  if (!config) {
    return <CaseStudyUnavailable />;
  }

  return <ProjectCaseStudyPage config={config} />;
}
