// Jonathan Petersen
// A01236750
// Racer Class
// Race Tracker Assignment

import java.time.LocalDate;
import java.time.LocalTime;

public class Racer {
    public final String name;
    public final LocalDate dateOfBirth;
    public final int bibNumber;
    public final LocalTime finishTime;
    public final boolean finishedRace;

    @Override
    public String toString() {
        String toReturn = "Racer{Name:" + name + ", DOB:" + dateOfBirth + " Bib Number:" + bibNumber;
        if (finishedRace) {
            toReturn += " Finish Time:" + finishTime;
        }
        toReturn += "}";
        return toReturn;
    }

    public void print() {
        System.out.println(this);
    }

    Racer() {
        name = "Unknown Name";
        dateOfBirth = LocalDate.MIN;
        bibNumber = -1;
        finishTime = LocalTime.MIN;
        finishedRace = false;
    }

    Racer(String name, int year, int month, int day, int bibNumber) {
        this.name = name;
        this.dateOfBirth = LocalDate.of(year, month, day);
        this.bibNumber = bibNumber;
        this.finishTime = LocalTime.MAX;
        this.finishedRace = false;
    }
}
