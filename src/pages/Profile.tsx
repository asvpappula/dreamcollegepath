import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  Upload,
  AlertCircle,
  CheckCircle2,
  Target,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserData, uploadAvatar, UserData } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, userData, loading, refreshUserData } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Profile form state
  const [profileData, setProfileData] = useState<Partial<UserData>>({
    firstName: "",
    lastName: "",
    preferredName: "",
    phone: "",
    school: "",
    gradYear: new Date().getFullYear(),
    interests: [],
    goals: "",
  });

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        preferredName: userData.preferredName || "",
        phone: userData.phone || "",
        school: userData.school || "",
        gradYear: userData.gradYear || new Date().getFullYear(),
        interests: userData.interests || [],
        goals: userData.goals || "",
      });
    }
  }, [userData]);

  const handleInputChange = (field: keyof UserData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestsChange = (value: string) => {
    const interests = value.split(',').map(interest => interest.trim()).filter(Boolean);
    handleInputChange('interests', interests);
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    try {
      await updateUserData(currentUser.uid, profileData);
      await refreshUserData();
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setProfileData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        preferredName: userData.preferredName || "",
        phone: userData.phone || "",
        school: userData.school || "",
        gradYear: userData.gradYear || new Date().getFullYear(),
        interests: userData.interests || [],
        goals: userData.goals || "",
      });
    }
    setIsEditing(false);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUser) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const photoURL = await uploadAvatar(currentUser.uid, file);
      await updateUserData(currentUser.uid, { photoURL });
      await refreshUserData();
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || !userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to load profile data. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.photoURL || currentUser.photoURL || ''} alt={userData.name || currentUser.displayName || ''} />
                  <AvatarFallback className="text-2xl">
                    {(userData.name || currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData.preferredName || userData.firstName || userData.name || currentUser.displayName || 'User'}
                </h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {userData.email || currentUser.email}
                </p>
                {userData.school && (
                  <p className="text-gray-600 flex items-center mt-1">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {userData.school} {userData.gradYear && `• Class of ${userData.gradYear}`}
                  </p>
                )}
              </div>
              
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
                className="ml-auto"
              >
                {isEditing ? (
                  <><X className="h-4 w-4 mr-2" /> Cancel</>
                ) : (
                  <><Edit className="h-4 w-4 mr-2" /> Edit Profile</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing ? "Update your personal information" : "Your personal information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profileData.firstName || ''}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profileData.lastName || ''}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.lastName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredName">Preferred Name</Label>
                  {isEditing ? (
                    <Input
                      id="preferredName"
                      value={profileData.preferredName || ''}
                      onChange={(e) => handleInputChange('preferredName', e.target.value)}
                      placeholder="How would you like to be called?"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{userData.preferredName || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      {userData.phone ? (
                        <><Phone className="h-4 w-4 mr-2" />{userData.phone}</>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="school">School/University</Label>
                    {isEditing ? (
                      <Input
                        id="school"
                        value={profileData.school || ''}
                        onChange={(e) => handleInputChange('school', e.target.value)}
                        placeholder="Enter your school"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.school || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="gradYear">Graduation Year</Label>
                    {isEditing ? (
                      <Input
                        id="gradYear"
                        type="number"
                        value={profileData.gradYear || ''}
                        onChange={(e) => handleInputChange('gradYear', parseInt(e.target.value) || new Date().getFullYear())}
                        placeholder="2024"
                        min="2020"
                        max="2030"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.gradYear || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="interests">Interests</Label>
                  {isEditing ? (
                    <Input
                      id="interests"
                      value={profileData.interests?.join(', ') || ''}
                      onChange={(e) => handleInterestsChange(e.target.value)}
                      placeholder="Enter interests separated by commas"
                    />
                  ) : (
                    <div className="mt-1">
                      {userData.interests && userData.interests.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {userData.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-900">Not provided</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="goals">Goals</Label>
                  {isEditing ? (
                    <Textarea
                      id="goals"
                      value={profileData.goals || ''}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="What are your academic and career goals?"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{userData.goals || 'Not provided'}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Saving...</>
                      ) : (
                        <><Save className="h-4 w-4 mr-2" /> Save Changes</>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progress Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Application Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Completion</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>College Research</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Application Essays</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Complete SAT Registration</p>
                      <p className="text-xs text-gray-500">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Research Safety Schools</p>
                      <p className="text-xs text-gray-500">Due in 1 week</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Draft Personal Statement</p>
                      <p className="text-xs text-gray-500">Due in 2 weeks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;