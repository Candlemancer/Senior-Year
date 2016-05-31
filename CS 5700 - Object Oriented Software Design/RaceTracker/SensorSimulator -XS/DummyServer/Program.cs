using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Sockets;

using Messages;

namespace DummyServer
{
    class Program
    {
        static UdpClient updClient;

        static void Main(string[] args)
        {
            // This dummy server receives RacerStatus Messages from the simulator
            // and simply prints them to the screen

            updClient = new UdpClient(14000);       // Bind to a specific port, like 14000
            ReceiveData();
        }

        static void ReceiveData()
        {
            while (true)                            // This is not a good loop termination condiation, but this is Dummy Server!
            {

                IPEndPoint ep = new IPEndPoint(IPAddress.Any, 0);
                byte[] messageByes = updClient.Receive(ref ep);
                if (messageByes != null)
                {
                    RacerStatus statusMessage = RacerStatus.Decode(messageByes);
                    if (statusMessage != null)
                    {
                        Console.WriteLine("Race Bib #={0}, Sensor={1}, Time={2}",
                                    statusMessage.RacerBibNumber,
                                    statusMessage.SensorId,
                                    statusMessage.Timestamp);

                        // A non-dummy server would do something intelligent with the message,
                        // like lookup the racer and update the last sensor and time
                    }
                }
            }
        }
    }
}
