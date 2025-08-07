import type * as React from "react";
import {
  Home,
  TrendingUp,
  Users,
  Bookmark,
  MessageSquare,
  User,
  Settings,
  Plus,
  Hash,
  Star,
  Clock,
  Award,
  Shield,
  HelpCircle,
  Bell,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Sample data for interests/topics
const userInterests = [
  { name: "Technology", count: 1234, trending: true },
  { name: "Gaming", count: 856, trending: false },
  { name: "Science", count: 642, trending: true },
  { name: "Movies", count: 423, trending: false },
  { name: "Books", count: 312, trending: false },
];

const trendingTopics = [
  { name: "AI Revolution", posts: 89 },
  { name: "Climate Change", posts: 67 },
  { name: "Space Exploration", posts: 45 },
];

const recentCommunities = [
  { name: "r/webdev", members: "2.1M" },
  { name: "r/programming", members: "4.2M" },
  { name: "r/design", members: "890K" },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className=" ">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <MessageSquare className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <h1 className="text-xl font-semibold">
                    NOTE<span className="font-bold text-amber-400">WORDS</span>
                  </h1>
                  <span className="text-xs">Community Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Quick Search */}
        <div className="px-2 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput placeholder="Search topics..." className="pl-8" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/dashboard">
                    <Home className="size-4" />
                    <span>Home Feed</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/trending">
                    <TrendingUp className="size-4" />
                    <span>Trending</span>
                    <Badge variant="secondary" className="ml-auto">
                      Hot
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/communities">
                    <Users className="size-4" />
                    <span>Communities</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/create">
                    <Plus className="size-4" />
                    <span>Create Topic</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Personal Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/profile">
                    <User className="size-4" />
                    <span>My Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/saved">
                    <Bookmark className="size-4" />
                    <span>Saved Posts</span>
                    <Badge variant="outline" className="ml-auto">
                      12
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/history">
                    <Clock className="size-4" />
                    <span>Reading History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/notifications">
                    <Bell className="size-4" />
                    <span>Notifications</span>
                    <Badge variant="destructive" className="ml-auto">
                      3
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Interests */}
        <SidebarGroup>
          <SidebarGroupLabel>Your Interests</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userInterests.map((interest) => (
                <SidebarMenuItem key={interest.name}>
                  <SidebarMenuButton asChild>
                    <a href={`/topics/${interest.name.toLowerCase()}`}>
                      <Hash className="size-4" />
                      <span>{interest.name}</span>
                      {interest.trending && (
                        <TrendingUp className="ml-auto size-3 text-orange-500" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/interests/manage">
                    <Settings className="size-4" />
                    <span>Manage Interests</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Trending Topics */}
        <SidebarGroup>
          <SidebarGroupLabel>Trending Now</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {trendingTopics.map((topic) => (
                <SidebarMenuItem key={topic.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`/topic/${topic.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      <Star className="size-4" />
                      <span className="truncate">{topic.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {topic.posts}
                      </Badge>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Communities */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Communities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentCommunities.map((community) => (
                <SidebarMenuItem key={community.name}>
                  <SidebarMenuButton asChild>
                    <a href={`/community/${community.name}`}>
                      <Users className="size-4" />
                      <span>{community.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {community.members}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Moderation (if user is moderator) */}
        <SidebarGroup>
          <SidebarGroupLabel>Moderation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/mod/queue">
                    <Shield className="size-4" />
                    <span>Mod Queue</span>
                    <Badge variant="destructive" className="ml-auto">
                      5
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/mod/reports">
                    <Award className="size-4" />
                    <span>Reports</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/help">
                <HelpCircle className="size-4" />
                <span>Help & Support</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
