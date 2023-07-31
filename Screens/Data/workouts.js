const data = [
  {
    id: 1,
    name: 'Pull-ups',
    reps: '8 reps and 3 sets',
    image: require('../../assets/Workout1screen/Pullups.gif'),
    type: 'Back'
  },
  {
    id: 2,
    name: 'Lat Pulldowns',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout1screen/LatPulldowns.gif'),
    type: 'Back'
  },
  {
    id: 3,
    name: 'Dumbbell Rows',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout1screen/DumbbellRows.gif'),
    type: 'Back'
  },
  {
    id: 4,
    name: 'Barbell Rows',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout1screen/BarbellRows.gif'),
    type: 'Back'
  },
  {
    id: 5,
    name: 'Hammer Curls',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout1screen/HammerCurls.gif'),
    type: 'Bicep'
  },
  {
    id: 6,
    name: 'Alternating Dumbbell Curls',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
    type: 'Bicep'

  },
  {
    id: 7,
    name: 'Weighted Pull-Ups',
    reps: '10 reps 4 sets',
    image: require('../../assets/Workout2screens/weighted-pull-up.gif'),
    type: 'Back'
  },
  {
    id: 8,
    name: 'Barbell Rows',
    reps: '15 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout2screens/barbell-row.gif'),
    type: 'Back'
  },
  {
    id: 9,
    name: 'One-Arm Dumbbell Rows',
    reps: '15 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout2screens/one-arm-dumbbell-row.gif'),
    type: 'Back'
  },
  {
    id: 10,
    name: 'Chin-Ups',
    reps: '15 reps and 4 sets, increase weight each set. Last set drop set',
    image: require('../../assets/Workout2screens/chin-ups.gif'),
    type: 'Back'
  },
  {
    id: 11,
    name: 'T-Bar Rows',
    reps: '15 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout2screens/t-bar-row.gif'),
    type: 'Back'
  },
  {
    id: 12,
    name: 'Concentration Curls',
    reps: '15 reps and 4 sets',
    image: require('../../assets/Workout2screens/concentration-curl.gif'),
    type: 'Bicep'
  },
  {
    id: 13,
    name: 'Hammer Curls',
    reps: 'Drop set',
    image: require('../../assets/Workout2screens/hammer-curl.gif'),
    type: 'Bicep'
  },
  {
    id: 14,
    name: 'Push-Ups',
    reps: '20 reps and 5 sets',
    image: require('../../assets/Workout3screens/pushup.gif'),
    type: 'Chest'
  },
  {
    id: 15,
    name: 'Dumbbell Chest Press',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout3screens/dumbbellChestPress.gif'),
    type: 'Chest'
  },
  {
    id: 16,
    name: 'Triceps Dips',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout3screens/tricepdips.gif'),
    type: 'Tricep'
  },
  {
    id: 17,
    name: 'Triceps Kickbacks:',
    reps: '12 reps and 3 sets',
    image: require('../../assets/Workout3screens/tricepkickbacks.gif'),
    type: 'Tricep'
  },
  {
    id: 18,
    name: 'Incline Dumbbell Press',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/InclineDumbbellPress.gif'),
    type: 'Chest'
  },
  {
    id: 19,
    name: 'Close-Grip Bench Press',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/CloseGripBenchPress.gif'),
    type: 'Chest'
  },
  {
    id: 20,
    name: 'Ring Push-Ups',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/RingPush-Ups.gif'),
    type: 'Chest'
  },
  {
    id: 21,
    name: 'Dumbbell Floor Press',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/DumbbellFloorPress.gif'),
    type: 'Chest'
  },
  {
    id: 22,
    name: 'Plyometric Push-Ups',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/PlyometricPushUps.gif'),
    type: 'Chest'
  },
  {
    id: 23,
    name: 'Cable Crossover',
    reps: '12 reps and 4 sets, increase weight each set',
    image: require('../../assets/Workout4screen/CableCrossover.gif'),
    type: 'Chest'
  },
  {
    id: 24,
    name: 'Weighted Dips',
    reps: '25 reps 4 sets no rest',
    image: require('../../assets/Workout4screen/WeightedDips.gif'),
    type: 'Tricep'
  },
  {
    id: 25,
    name: 'Diamond Push-Ups',
    reps: '25 reps 4 sets no rest',
    image: require('../../assets/Workout4screen/DiamondPushUps.gif'),
    type: 'Tricep'
  },
  {
    id: 26,
    name: 'Both Arms Dumbbell',
    reps: '25 reps 4 sets no rest',
    image: require('../../assets/Workout4screen/Botharmsdumbbell.gif'),
    type: 'Tricep'
  },
  {
    id: 27,
    name: 'Bodyweight Squats',
    reps: '10 reps',
    image: require('../../assets/Workout5screen/BodyweightSquats.gif'),
    type: 'Leg'
  },
  {
    id: 28,
    name: 'Walking Lunges',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/WalkingLunges.gif'),
    type: 'Leg'
  },
  {
    id: 29,
    name: 'Glute Bridge',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/GluteBridge.gif'),
    type: 'Leg'
  },
  {
    id: 30,
    name: 'Dumbbell Shoulder Press',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/DumbbellShoulderPress.gif'),
    type: 'Shoulder'
  },
  {
    id: 31,
    name: 'Front Raises',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/FrontRaises.gif'),
    type: 'Shoulder'
  },
  {
    id: 32,
    name: 'Lateral Raises',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/LateralRaises.gif'),
    type: 'Shoulder'
  },
  {
    id: 33,
    name: 'Shoulder Shrugs',
    reps: '12 reps',
    image: require('../../assets/Workout5screen/ShoulderShrugs.gif'),
    type: 'Shoulder'
  },
  {
    id: 34,
    name: 'Barbell Squat with Chains',
    reps: '10 reps',
    image: require('../../assets/Workout6screen/BarbellSquatwithChains.gif'),
    type: 'Leg'
  },
  {
    id: 35,
    name: 'Bulgarian Split Squats',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/BulgarianSplitSquats.gif'),
    type: 'Leg'
  },
  {
    id: 36,
    name: 'Pistol Squats',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/PistolSquats.gif'),
    type: 'Leg'
  },
  {
    id: 37,
    name: 'Standing Barbell Overhead Press',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/StandingBarbellOverheadPress.gif'),
    type: 'Shoulder'
  },
  {
    id: 38,
    name: 'Handstand Push-ups',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/HandstandPushups.gif'),
    type: 'Shoulder'
  },
  {
    id: 39,
    name: 'Arnold Press',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/ArnoldPress.gif'),
    type: 'Shoulder'
  },
  {
    id: 40,
    name: 'Dumbbell Lateral Raises',
    reps: '12 reps',
    image: require('../../assets/Workout6screen/DumbbellLateralRaises.gif'),
    type: 'Shoulder'
  },
];




//var myWorkouts = []
var myMeasurements = []

export { data, myMeasurements };