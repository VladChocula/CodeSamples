
class SwingDoor extends Actor
	dependson(Hazard_RoadBlock)
    placeable;
	
// Height determines open angle of the door in degrees; 1 = 75, 2 = 90, 3 = 140, 4 = 180.
var() int Height<DisplayName=Open Angle | UIMin = 1 | UIMax = 4>;
var() StaticMeshComponent Mesh;
var() StaticMeshComponent FrameMesh;
var() float TrainLength;

var() float OpeningSlowDownRate;
var() float ClosingSlowDownRate;
var() float ClosingSlowDownMax;
var() float OpeningSlowDownMax;

var() float OpeningSpeed;
var() float ClosingSpeed;

var() float OpenDegreeRoll;
var() Rotator ClosedDegreeRot;
var() float ClosedDegreeRoll;
var() int DoorOpeningRate;
var() float OpenSeconds;
var() Rotator DoorAnimationRot;
var() bool OpenDownSwing;
var() Rotator MeshRotator;
var() int DoorRadius;

// Type of knockback to perform when player collides with this roadblock at high speed.
var() RoadBlockKnockType KnockType;

var() float TrainDistance;

enum DoorState
{
	DOOROPENING,
	DOOROPEN,
	DOORCLOSING,
	DOORCLOSED
};

var() DoorState DoorState;

defaultproperties
{
	Begin Object Class=StaticMeshComponent Name=Model0
		StaticMesh=StaticMesh'Levels_Metro.models.metro_door_circle'
		bUsePrecomputedShadows=TRUE
		LightingChannels = (Static=True,Dynamic=True)
		Rotation=(Yaw=-16384)
		Scale = 1.1
		BlockActors=false
		CollideActors=false
		MaxDrawDistance=6000
		ForcedLodModel = 1
	End Object
	Components.Add(Model0)
	Mesh=Model0

	Begin Object Class=StaticMeshComponent Name=Frame
		StaticMesh=StaticMesh'Levels_Metro_Z.models.metro_door_frame_area'
		bUsePrecomputedShadows=TRUE
		LightingChannels = (Static=True,Dynamic=True)
		Rotation=(Yaw=-16384)
		Scale = 1.1
		BlockActors=false
		CollideActors=false
		MaxDrawDistance=6000
	End Object
	Components.Add(Frame)
	FrameMesh=Frame

	Begin Object Class=StaticMeshComponent Name=Blocker
		StaticMesh=StaticMesh'PrimitiveShapes.TexPropCube'
		Scale3D=(X=0.225,Y=1.8,Z=1.8)
		Translation=(X=0,Y=0,Z=-180)
		BlockActors=true
		CollideActors=true
		CanBeEdgeGrabbed=false
		CanBeWallSlid=false
		HiddenGame=true
		HiddenEditor=true
	End Object
	Components.Add(Blocker)
	
	Begin Object Class=StaticMeshComponent Name=Collider
		StaticMesh=StaticMesh'PrimitiveShapes.TexPropCube'
		Scale3D=(X=2.475,Y=1.8,Z=1.8)
		Translation=(X=146.25,Y=0,Z=-180)
		BlockActors=false
		CollideActors=true
		HiddenGame=true
		HiddenEditor=true
	End Object

	Components.Add(Collider)
	CollisionComponent=Collider

	bCollideActors=true
	bMovable=false
	Physics = Phys_None
	bBlockActors=true
	bCollideWorld=false
	bEdShouldSnap=true;

	TickOptimize = TickOptimize_None

	bEncroachPlayersOnly=true;

	KnockType = RoadBlockKnockType_AutoSide
	
	TrainLength = 4820.0f;
	DoorState = DOORCLOSED;
	OpeningSpeed = 23237;
	ClosingSpeed = 24500;
	OpeningSlowDownRate = 500;
	ClosingSlowDownRate = 5000;
	OpenDegreeRoll = 90.0f;
	OpenSeconds = 5.6f;
	DoorRadius = 3000;
	OpenDownSwing = false;
	Height = 2;
}

event Tick(float d)
{
	MeshRotator = Mesh.Rotation;

	if(DoorState == DOORCLOSED)
	{
		DoorClosed(d);
	}
	
	else if (DoorState == DOOROPENING)
	{
		DoorOpening(d);
	}

	else if (DoorState == DOORCLOSING)
	{
		DoorClosing(d);
	}

}

event Bump(Actor Other, PrimitiveComponent OtherComp, vector HitNormal)
{
	local PawnCombat p;

	Super.Bump(Other, OtherComp, HitNormal);

	p = PawnCombat(Other);

	if (p == None) 
		return;

	else if (p.Base == None || !p.Base.IsA('Hazard_Train')) 
		return;

	class 'Hazard_RoadBlock'.static.DoKnockBack(p, self, HitNormal, KnockType, 0);
}

simulated event PostBeginPlay()
{
	Super.PostBeginPlay();
	SetTickIsDisabled(false);
	ClosedDegreeRot = Mesh.Rotation;
	ClosedDegreeRoll = (ClosedDegreeRot.Roll * UnrRotToDeg);

	if (Height == 1)
		OpenDegreeRoll = 75;
		
	else if (Height == 2)
		OpenDegreeRoll = 90;

	else if (Height == 3)
		OpenDegreeRoll = 140;

	else if (Height == 4)
		OpenDegreeRoll = 180;

}


function DoorOpening(float dt)
{	
	local Rotator MeshRotation;
	MeshRotation = Mesh.Rotation;

	if (!OpenDownSwing)
	{
		//Doors were placed in reverse, so iterating with a negative delta causes the door to rise correctly
		DoorAnimationRot.Roll = -1 * dt * OpeningSpeed;
		DoorAnimationRot.Pitch = 0;
		DoorAnimationRot.Yaw = 0;
		DoorAnimationRot += Mesh.Rotation;

		Mesh.SetRotation(DoorAnimationRot);

		if ((MeshRotation.Roll*UnrRotToDeg)*-1 > (OpenDegreeRoll + 10.f))
			OpenDownSwing = true;

	}

	else if ((MeshRotation.Roll*UnrRotToDeg)*-1 > OpenDegreeRoll)
	{
		DoorAnimationRot.Roll = dt * OpeningSpeed;
		DoorAnimationRot.Pitch = 0;
		DoorAnimationRot.Yaw = 0;
		DoorAnimationRot += Mesh.Rotation;
		Mesh.SetRotation(DoorAnimationRot);
	}

	if ( (MeshRotation.Roll*UnrRotToDeg) * -1 < OpenDegreeRoll && OpenDownSwing)
	{
			DoorState = DOOROPEN;
			OpenDownSwing = false;

			if(IsTimerActive('SetStateToClosing')) 
				ClearTimer('SetStateToClosing');
			SetTimer(OpenSeconds, false, 'SetStateToClosing');
	}
	
}

function DoorClosing(float dt)
{
	local Rotator MeshRotation;
	MeshRotation = Mesh.Rotation;

	if ((MeshRotation.Roll*UnrRotToDeg) < ClosedDegreeRoll)
	{
		DoorAnimationRot.Roll = dt * ClosingSpeed;
		DoorAnimationRot.Pitch = 0;
		DoorAnimationRot.Yaw = 0;
		DoorAnimationRot += Mesh.Rotation;
		Mesh.SetRotation(DoorAnimationRot);
	}

	if ((MeshRotation.Roll*UnrRotToDeg) > ClosedDegreeRoll)
		DoorState = DOORCLOSED;

}

function DoorClosed(float dt)
{
	local Hazard_Train MyTrain;

	foreach NearbyDynamicActors(class'Hazard_Train', MyTrain, DoorRadius)
	{
			//TrainDistance is used to track how close the CatTrain is getting to the door.
			TrainDistance = VSize(Self.Location - MyCatTrain.CatMesh.Bounds.Origin);
								
			//If the train enters <units> to the train door, train door opens
			if(TrainDistance < 620)
			{
				OpenDownSwing = false;
				DoorState = DOOROPENING;
				
				//Grabbing the BoxExtent of the TrainMesh & CatMesh, adding them, dividing by AdjustSpeed to get length of time door should be open.
				TrainLength = MyTrain.TrainMesh.Bounds.BoxExtent.z + MyTrain.Mesh.Bounds.BoxExtent.z;

				if( (TrainLength/MyTrain.AdjustedSpeed) > 1.0f)
					OpenSeconds = CatTrainLength / MyTrain.AdjustedSpeed;
				
			}
			
	}
}

function SetStateToClosing()
{
	DoorState = DOORCLOSING;
}

event editoronly OnEditorCustomCommand(Name Command, int Index)
{
	if (Command == 'Symbol')
	{
		if (Index == 0) Mesh.SetStaticMesh(`EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_circle"));
		else if (Index == 1) Mesh.SetStaticMesh(`EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_diamond"));
		else if (Index == 2) Mesh.SetStaticMesh(`EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_sqaure"));
		else if (Index == 3) Mesh.SetStaticMesh(`EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_triangle"));
	}
}

event editoronly GetCustomEditorCommands(out Array<ActorCustomEditorCommand> Result)
{
	local ActorCustomEditorCommand Item;

	Item.Text = "Symbol";
	Item.Options.Length = 0;
	Item.Options.AddItem("Circle");
	Item.Options.AddItem("Diamond");
	Item.Options.AddItem("Square");
	Item.Options.AddItem("Triangle");
	Item.Command = 'Symbol';
	
	Item.CurrentValue = INDEX_NONE;
	if (Mesh != None)
	{
		if (Mesh.StaticMesh == `EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_circle")) Item.CurrentValue = 0;
		else if (Mesh.StaticMesh == `EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_diamond")) Item.CurrentValue = 1;
		else if (Mesh.StaticMesh == `EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_sqaure")) Item.CurrentValue = 2;
		else if (Mesh.StaticMesh == `EditorLoadObject(class'StaticMesh', "HatInTime_Levels_Metro_Z.models.metro_cat_door_triangle")) Item.CurrentValue = 3;
	}

	Result.AddItem(Item);
}

`endif