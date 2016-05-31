using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading.Tasks;

namespace SensorSimulator.AppLayer
{
    public class Racer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int RaceBibNumber { get; set; }

        // Internal Properties used for the simulation
        public double RelativeSpeed { get; set; }
        public Racer WillTryToCheatWith { get; set; }
        public int Time { get; set; }

        public void Write(StreamWriter write, int groupId)
        {
            write.WriteLine("{0},{1},{2},{3}", FirstName, LastName, RaceBibNumber, groupId);
        }
    }
}
