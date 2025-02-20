import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCampaign } from "@/lib/repo/campaign";
import Image from "next/image";
import { Switch } from "../ui/switch";
import ActionTable from "./actionTable";
import Link from "next/link";
const TableCampaign = async () => {
  const campaign = await getAllCampaign();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5px]">No</TableHead>
          <TableHead>Campaign</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campaign.map((campaign, index) => (
          <TableRow key={campaign.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="">
              <Link
                className="flex gap-2 items-center"
                href={`/campaign/${campaign.url}`}
              >
                {" "}
                <Image
                  src={campaign.imageThumb}
                  alt={campaign.title}
                  height={50}
                  width={50}
                  className="object-cover"
                />
                {campaign.title}
              </Link>
            </TableCell>
            <TableCell>
              <Switch />
            </TableCell>
            <TableCell>
              <ActionTable id={campaign.id} url={campaign.url} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCampaign;
