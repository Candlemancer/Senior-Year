// Jonathan Petersen
// A01236750
// Cheating Computer Class
// Race Tracker Assignment

import java.net.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Observer;
import java.util.Observable;


public class CheatingComputer implements Observer {

    @Override
    public void update(Observable server, Object args) {
        RacerState rs = (RacerState) args;
        System.out.println("Cheating Computer got the Racer State!");
    }

    CheatingComputer() {

        

        
    }




}
