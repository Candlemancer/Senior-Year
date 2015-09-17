# Jonathan Petersen
# A01236750
# Shapes Assignment
# Output Class

import collections
import json
import os
import types
import pprint
import xml.etree.ElementTree as xml

class Output:
	def __init__(self):
		self.strategy = stdoutStrategy;
		return;

	def __init__(self, strategy):
		self.strategy = strategy;
		return;

	def writeFile(self, dict):
		self.strategy(dict);
		return;

def stdoutStrategy(dict):
	pp = pprint.PrettyPrinter();
	pp.pprint(dict);
	return;

def csvStrategy(dict):
	file = open("results.csv", "w")
	for key, value in dict.items():
		file.write(str(key) + "," + repr(value) + "\n");
	file.close();
	return;

def jsonStrategy(dict):
	file = open("results.json", "w");
	json.dump(dict, file, 
		indent=2
		);
	file.close();
	return;

####################################################################################################



