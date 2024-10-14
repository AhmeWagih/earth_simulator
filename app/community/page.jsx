'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Bookmark, Image as ImageIcon, Link as LinkIcon, Send, MapPin, Briefcase, Twitter, Linkedin, Users, Github } from "lucide-react"

const initialPosts = [
  {
    id: 1,
    author: "Fatma",
    avatar: "/assets/avatar.png",
    timeAgo: "11 hours ago",
    content: "Forests are the lungs of the Earth, absorbing carbon and providing oxygen. But with the increasing rate of deforestation for commercial purposes, we are losing these vital resources rapidly. Every tree cut down affects the ecosystem and contributes to climate change. Let's unite to support reforestation projects and protect the forests that provide us with clean air and wildlife",
    comments: [],
    commentCount: 140,
    saved: false
  },
  {
    id: 2,
    author: "Ali",
    avatar: "/assets/avatar.png",
    timeAgo: "20 hours ago",
    content: "Solar energy is clean and renewable. Solar panels produce electricity without emissions, cutting pollution and costs. Have you considered switching to solar",
    comments: [],
    commentCount: 100,
    image: "/assets/earthh.png",
    saved: false
  },
  {
    id: 3,
    author: "Mohamed",
    avatar: "/assets/avatar.png",
    timeAgo: "6 hours ago",
    content: "Global warming is one of the biggest challenges our planet faces today. With the increase in greenhouse gas emissions, global temperatures are rising, causing polar ice to melt and sea levels to rise. If this trend continues, we may face more natural disasters like floods and wildfires. We must act now to preserve our planet for future generations",
    comments: [],
    commentCount: 49,
    saved: false
  },
  {
    id: 4,
    author: "Ahmed",
    avatar: "/assets/avatar.png",
    timeAgo: "2 hours ago",
    content: "Water is a precious resource, yet millions of gallons are wasted every day due to inefficient usage and leaks. With climate change affecting global water supplies, it's more important than ever to conserve water. Simple actions like fixing leaks, using water-saving appliances, and reducing unnecessary water usage can make a big difference. Let's work together to protect our water resources for future generations",
    comments: [],
    commentCount: 110,
    saved: false
  },
]

export default function Component() {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [newComments, setNewComments] = useState({})

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        timeAgo: "Just now",
        content: newPost,
        comments: [],
        commentCount: 0,
        saved: false
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleSavePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, saved: !post.saved } : post
    ))
  }

  const handleAddComment = (postId) => {
    if (newComments[postId]?.trim()) {
      setPosts(posts.map(post =>
        post.id === postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                author: "Current User",
                avatar: "/placeholder.svg?height=40&width=40",
                content: newComments[postId],
                timestamp: "Just now"
              }
            ],
            commentCount: post.commentCount + 1
          }
          : post
      ))
      setNewComments({ ...newComments, [postId]: '' })
    }
  }
  return (
    <div className="flex max-w-6xl mx-auto p-4 gap-4 relative z-20">
      {/* User Profile Sidebar */}
      <Card className="w-64 h-fit sticky top-4">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/assets/avatar.png" alt="User" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Current User</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="w-4 h-4" />
                3 friends
              </p>
            </div>
          </div>
          <div className="border-t border-border  mt-4 pt-4 flex flex-col gap-2">
            <p className="text-sm">Who's viewed your profile <span className="font-semibold">56</span></p>
            <p className="text-sm">Impressions of your post <span className="font-semibold">980</span></p>
          </div>
          <div className="border-t border-border mt-4 pt-4">
            <h3 className="font-semibold mb-2">Social Profiles</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Github className="w-4 h-4 mr-2" />
                Github
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Content */}
      <div className="flex-grow space-y-4 w-[calc(100%-320px)]">
        <Card className="w-full shadow-lg rounded-lg border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/assets/avatar.png" alt="Current user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Textarea
                className="flex-grow"
                placeholder="Share your thoughts..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Button variant="outline" size="sm" className="mr-2">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
              <Button onClick={handleCreatePost} className="bg-blue-600 text-white hover:bg-blue-700">
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
        {posts.map((post) => (
          <Card key={post.id} className="w-full shadow-lg rounded-lg border border-gray-200">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.author} width={40} height={40} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="mt-4 rounded-lg max-w-full h-auto"
                />
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="flex justify-between w-full mb-4">
                <Button variant="ghost" className="flex items-center space-x-2" onClick={() => handleSavePost(post.id)}>
                  <Bookmark className={`h-5 w-5 ${post.saved ? 'fill-current' : ''}`} />
                  <span>{post.saved ? 'Saved' : 'Save'}</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.commentCount} Comments</span>
                </Button>
              </div>
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2 w-full mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">{comment.author}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <p className="text-xs text-gray-500">{comment.timestamp}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center space-x-2 w-full mt-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/assets/avatar.png" alt="Current user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input
                  className="flex-grow"
                  placeholder="Add a comment..."
                  value={newComments[post.id] || ''}
                  onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
                />
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleAddComment(post.id)}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send comment</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}