// Jonathan Petersen
// A01236750
// Racer State Class
// Race Tracker Assignment

import java.util.HashMap;

public class RacerState {
    public HashMap<String, String> data = new HashMap<>();

    // Given a string of raw data, parses the data and adds the values to the map.
    private void addEntry(String raw) {
        String[] params = raw.split(",");
        params[0] = params[0].substring(1);
        params[2] = params[2].substring(0, 18);

        for (String s : params) {
            String[] values = s.split(":");
            data.put(values[0].split("\"")[1], values[1]);
        }
    }

    public int getBibNumber() {
    	return Integer.parseInt(data.get("RacerBibNumber"));
    }

    RacerState() {
    }

    RacerState(String str) {
        addEntry(str);
    }
}
