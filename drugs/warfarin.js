const warfarin = {
  id: 5,
  name: "warfarin",
  route: "parentral",
  switching: {
    enoxaparin: [
      "Stop Warfarin",
      "	Start the parenteral anticoagulant when INR is as close as possible to the lower end of the targeted INR range. ",
    ],
    apixaban: [
      "Discontinue warfarin",
      "Initiate apixaban as soon as INR falls to <2 (US labeling).",
    ],
    edoxaban: [
      "Discontinue warfarin",
      "Initiate Edoxaban as soon as INR falls to ≤2.5 (US labeling). ",
    ],
    rivaroxaban: [
      "Discontinue warfarin",
      "Initiate rivaroxaban as soon as INR falls to <3 (US labeling) or ≤ 2.5 (Canadian labeling).",
    ],
  },
};

export default warfarin;
