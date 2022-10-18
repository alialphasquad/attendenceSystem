import { prismaMock } from "./../singleton";
import { addAttendance,updateAttendance } from "./attendance";
const attendance: any = {
    id: 1,
    date: "2022-08-23T13:19:31.945Z",
    presentStatus: true,
    userId: 1
  };
  describe("test Attendance ", () => {
    test("should addAttendance", async () => {
      prismaMock.attendance.create.mockResolvedValue(attendance);
      await expect(addAttendance(attendance)).resolves.toEqual(attendance);
    });
    test("should updated", async () => {
        prismaMock.attendance.update.mockResolvedValue(attendance);
        await expect(updateAttendance(attendance)).resolves.toEqual(attendance)
    });
  });