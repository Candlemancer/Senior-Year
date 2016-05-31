// Jonathan Petersen
// A01236750
// RacerView Class
// Race Tracker Assignment

import java.util.ArrayList;
import java.util.Observer;
import java.util.Observable;
import java.util.TreeMap;

public class RacerView implements Observer {
    private TreeMap<Integer, Racer> racers = new TreeMap<>();
    private TreeMap<Integer, RaceGroup> raceGroups = new TreeMap<>();

    @Override
    public void update(Observable server, Object args) {
        RacerState rs = (RacerState) args;
        int bibNumber = rs.getBibNumber();

        racers.put(bibNumber, new Racer("John Doe", 1990, 1, 1, bibNumber));

        int groupID = (bibNumber / 100) + 1;
        raceGroups.put(groupID,
                new RaceGroup(groupID, "Racers", (groupID - 1) * RaceGroup.MAX_RACERS_PER_GROUP + 1,
                               groupID * RaceGroup.MAX_RACERS_PER_GROUP, 4, 0, 0));

        System.out.println("=====================================================================");
        printRacers();
        System.out.println("---------------------------------------------------------------------");
        printRaceGroups();
        System.out.println("=====================================================================");
    }

    public void printRacers() {
        System.out.println(racers);
    }

    public void printRaceGroups() {
        // System.out.println(raceGroups);
        for (RaceGroup g : raceGroups.values()) {
            g.print();
        }
    }

}
