export interface RepoStats {
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
}

export async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats | null> {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  
  if (!token) {
    // Graceful fallback if no token is provided
    return null;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      // Cache data for 1 hour to prevent hitting API rate limits and keep it fast
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      console.warn(`Failed to fetch repo ${owner}/${repo}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      language: data.language,
    };
  } catch (error) {
    console.error(`GitHub API Error for ${owner}/${repo}:`, error);
    return null;
  }
}
