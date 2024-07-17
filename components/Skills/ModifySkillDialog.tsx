import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ModifySkillDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-slate-500 hover:bg-slate-600">
          Modify Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Skill</DialogTitle>
          <DialogDescription>
            Modify skill details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Skill Name" className="text-right">
              Skill Name
            </Label>
            <Input id="SkillName" defaultValue="-" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="DateRange" className="text-right">
              Skill Type
            </Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quiz/Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quiz/Lab">Quiz/Lab</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="secondary"
              className="font-semibold bg-sky-500 hover:bg-sky-600 text-white"
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
