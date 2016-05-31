// Jonathan Petersen
// A01236750
// Racer State Class
// Race Tracker Assignment

import java.time.*;

public class RaceGroup {
    public static final int MAX_RACERS_PER_GROUP = 100;

    public final int groupID;
    public final String groupLabel;
    public final int bibNumbersStart;
    public final int bibNumbersEnd;
    public final LocalTime startTime;

    @Override
    public String toString() {
        return "Race Group{Group ID:" + groupID + ", Group Label:" + groupLabel + " Bib Numbers:"
                + bibNumbersStart + "-" + bibNumbersEnd + " Start Time:" + startTime + "}";
    }

    public void print() {
        System.out.println(this);
    }

    RaceGroup() {
        groupID = -1;
        groupLabel = "Invalid Group";
        bibNumbersStart = -1;
        bibNumbersEnd = -1;
        startTime = LocalTime.MIN;
    }

    RaceGroup(int groupID, String groupLabel, int bibNumbersStart, int bibNumbersEnd, int startHour,
            int startMinute, int startSecond) {
        if (bibNumbersEnd < bibNumbersStart
                || bibNumbersEnd > (bibNumbersStart + MAX_RACERS_PER_GROUP - 1)) {
            throw new IndexOutOfBoundsException();
        }

        this.groupID = groupID;
        this.groupLabel = groupLabel;
        this.bibNumbersStart = bibNumbersStart;
        this.bibNumbersEnd = bibNumbersEnd;
        this.startTime = LocalTime.of(startHour, startMinute, startSecond);
    }

}
