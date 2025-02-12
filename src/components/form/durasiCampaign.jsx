import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DurasiCampaignSelect = ({ value, onChange }) => {
  return (
    <Select
      onValueChange={(val) => onChange(Number(val))}
      value={value?.toString()}
    >
      <SelectTrigger>
        <SelectValue placeholder="Pilih Durasi" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="30">30 Hari</SelectItem>
        <SelectItem value="60">60 Hari</SelectItem>
        <SelectItem value="90">90 Hari</SelectItem>
        <SelectItem value="120">120 Hari</SelectItem>
        <SelectItem value="0">Tidak Ditentukan</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DurasiCampaignSelect;
