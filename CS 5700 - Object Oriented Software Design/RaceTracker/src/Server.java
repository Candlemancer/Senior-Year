// Jonathan Petersen
// A01236750
// Server Class
// Race Tracker Assignment

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.Observable;

public class Server extends Observable {
    public static final int bufferLength = 512;

    // Constructor
    Server() {
        this.addObserver(new RacerView());
        this.addObserver(new CheatingComputer());
        run();
    }

    private void run() {
        try {
            DatagramSocket socket = new DatagramSocket(14000);

            while (true) {
                // Get the racer updates
                RacerState rs = getUpdate(socket);

                // Notify all our observers.
                this.setChanged();
                this.notifyObservers(rs);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private RacerState getUpdate(DatagramSocket source) {
        try {
            byte[] buf = new byte[bufferLength];
            DatagramPacket p = new DatagramPacket(buf, bufferLength);
            source.receive(p);
            return new RacerState(new String(p.getData()));

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new RacerState();
    }

    public static void main(String[] args) {
        Server server = new Server();
    }
}
