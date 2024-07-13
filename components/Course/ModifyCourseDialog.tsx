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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ModifyCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-semibold bg-slate-500 hover:bg-slate-600">
          Modify Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify Course</DialogTitle>
          <DialogDescription>
            Modify course details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="CourseID" className="text-right">
              CourseID
            </Label>
            <Input id="CourseID" defaultValue="CS4341" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="CourseName" className="text-right">
              Course Name
            </Label>
            <Input
              id="CourseName"
              defaultValue="Computer Organization"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="DateRange" className="text-right">
              Date Range
            </Label>
            <Input
              id="DateRange"
              defaultValue="June 10 - July 8"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TimeRange" className="text-right">
              Time Range
            </Label>
            <Input
              id="TimeRange"
              defaultValue="11:30 - 2:00"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Location" className="text-right">
              Location
            </Label>
            <Input
              id="Location"
              defaultValue="LART 108"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Instructor" className="text-right">
              Instructor
            </Label>
            <Input
              id="Instructor"
              defaultValue="Dr. Eric Fruedenthal"
              className="col-span-3"
            />
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
