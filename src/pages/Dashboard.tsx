import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Star, 
  Trophy,
  Clock,
  BookOpen,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalGroups: 0,
    activeTrades: 0,
    userPoints: 0
  });
  const [recentForums, setRecentForums] = useState<any[]>([]);
  const [activeGroups, setActiveGroups] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load forum stats
      const { data: forums } = await supabase
        .from('forums')
        .select('*')
        .limit(3);
      
      if (forums) {
        setRecentForums(forums);
      }

      // Load sample groups data
      setActiveGroups([
        { id: 1, name: 'Grammar Masters', members: 245, theme: 'Grammar' },
        { id: 2, name: 'Conversation Club', members: 189, theme: 'Speaking' },
        { id: 3, name: 'Vocabulary Builders', members: 156, theme: 'Vocabulary' }
      ]);

      setStats({
        totalPosts: 127,
        totalGroups: 8,
        activeTrades: 5,
        userPoints: 2450
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const achievements = [
    { id: 1, name: 'First Post', description: 'Made your first forum post', earned: true },
    { id: 2, name: 'Group Leader', description: 'Created your first study group', earned: true },
    { id: 3, name: 'Helper', description: 'Helped 10 community members', earned: false },
    { id: 4, name: 'Trader', description: 'Completed 5 successful trades', earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome back to EnglishOne!</h1>
        <p className="text-muted-foreground">
          Continue your English learning journey with our amazing community
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-medium">{stats.userPoints} Points</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <span className="font-medium">Level: Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-medium">5 Achievements</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{stats.totalPosts}</div>
            <p className="text-xs text-blue-600">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Groups</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{stats.totalGroups}</div>
            <p className="text-xs text-green-600">+2 joined recently</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{stats.activeTrades}</div>
            <p className="text-xs text-orange-600">3 pending offers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Points</CardTitle>
            <Trophy className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{stats.userPoints}</div>
            <p className="text-xs text-purple-600">+150 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="groups">My Groups</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Forums */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Forum Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentForums.map((forum) => (
                  <div key={forum.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{forum.name}</h4>
                      <p className="text-sm text-muted-foreground">{forum.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Visit
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grammar Mastery</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vocabulary Building</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Speaking Practice</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{group.theme}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{group.members} members</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Enter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? 'bg-primary/5 border-primary/20' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className={`h-5 w-5 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                    {achievement.name}
                    {achievement.earned && <Badge variant="secondary">Earned</Badge>}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}