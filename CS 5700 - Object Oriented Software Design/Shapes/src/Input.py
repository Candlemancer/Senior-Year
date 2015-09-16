# Jonathan Petersen
# A01236750
# Shapes Assignment
# Input Class

import json
import os
import xml.etree.ElementTree as xml

class Input:
	def readFile(self, filename):
		return self.strategy(open(filename));

####################################################################################################

def jsonStrategy(filePointer):
	return json.load(filePointer);

def xmlStrategy(filePointer):
	tree = xml.parse(filePointer);
	root = tree.getroot();


	return;

def parseXMLTree(node):

	# Base Case
	i

