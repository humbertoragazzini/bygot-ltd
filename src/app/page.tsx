import { getCompanyInfo } from "@/lib/company";
import { HomeTemplate } from "@/components/templates/HomeTemplate";

export default function Page() {
  const company = getCompanyInfo();

  return <HomeTemplate company={company} />;
}
