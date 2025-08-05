"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, MapPin, Clock, Send, ImageIcon, Smile } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    role: string
  }
  content: string
  timestamp: Date
  location?: string
  likes: number
  comments: number
  isLiked: boolean
  type: "update" | "issue" | "event" | "discussion"
  status?: "resolved" | "in-progress" | "pending"
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Kimani",
      avatar: "/placeholder.svg?height=40&width=40&text=SK",
      role: "Community Leader",
    },
    content:
      "Great news! The water shortage issue on Kindaruma Road has been resolved. Thanks to everyone who reported and helped coordinate the response. This is what community collaboration looks like! 🎉",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    location: "Kindaruma Road",
    likes: 24,
    comments: 8,
    isLiked: true,
    type: "update",
    status: "resolved",
  },
  {
    id: "2",
    author: {
      name: "David Mwangi",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
      role: "Local Business Owner",
    },
    content:
      "Organizing a community cleanup this Saturday at 8 AM. Let's make our neighborhood shine! Bring gloves and enthusiasm. Refreshments will be provided. Who's in?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: "Yaya Centre",
    likes: 15,
    comments: 12,
    isLiked: false,
    type: "event",
  },
  {
    id: "3",
    author: {
      name: "Grace Wanjiku",
      avatar: "/placeholder.svg?height=40&width=40&text=GW",
      role: "Resident",
    },
    content:
      "Has anyone noticed the new street lights on Argwings Kodhek Road? They're much brighter and make evening walks feel safer. Kudos to whoever made this happen!",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    location: "Argwings Kodhek Road",
    likes: 31,
    comments: 6,
    isLiked: true,
    type: "discussion",
  },
]

const typeColors = {
  update: "bg-green-100 text-green-800",
  issue: "bg-red-100 text-red-800",
  event: "bg-blue-100 text-blue-800",
  discussion: "bg-purple-100 text-purple-800",
}

export function CommunityFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleSubmitPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=Y",
        role: "Resident",
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
      type: "discussion",
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Share something with your community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4 mr-2" />
                  Emoji
                </Button>
              </div>
              <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {post.author.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                      {post.location && (
                        <>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          {post.location}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={typeColors[post.type]}>{post.type}</Badge>
                  {post.status && (
                    <Badge variant="outline" className="text-xs">
                      {post.status}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.isLiked ? "text-red-600" : "text-gray-600"}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
